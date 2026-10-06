/* Quote form backend.
   Receives the contact/homepage quote form, validates it again server side,
   and hands it to Resend for delivery. Deliberately dependency free: there is
   no package.json in this project and no build step, so this file uses only
   the global fetch that Vercel's Node runtime provides.

   Two env vars are required on the Vercel project:
     RESEND_API_KEY    the Resend API key
     QUOTE_NOTIFY_TO   comma separated list of recipients
     QUOTE_FROM        sender, e.g. MLH Website <forms@example.com>, on any
                       domain verified in Resend

   QUOTE_NOTIFY_TO is an env var rather than a constant because this repo is
   public, and not every recipient address belongs in it. */

/* The From address only has to sit on a domain verified in Resend. It does
   not have to be this client's domain: these are internal notifications that
   only the business owner ever reads, and Reply goes to the customer via
   reply_to. One domain you own can therefore serve every site you build. */
var FROM = process.env.QUOTE_FROM || 'MLH Website <quotes@mlhrenovations.ca>';
var RESEND_ENDPOINT = 'https://api.resend.com/emails';

/* Already published all over the site markup, so it is safe here and gives
   the function somewhere to deliver if the env var is ever missing. */
var FALLBACK_TO = 'mlh.renovation727@gmail.com';

var MAX_SHORT = 200;
var MAX_DETAILS = 5000;

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PHONE_RE = /[\d\s()\-+]{7,}/;

function str(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Anything interpolated into a header line has to be collapsed to one line,
   or a crafted field value could inject extra headers. */
function oneLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

/* The raw pathname is meaningless to whoever reads the email. Only two
   pages carry a form, so a plain label beats '/' or '/contact'. */
function pageLabel(path) {
  if (path === '/' || path === '/index.html') return 'Home page';
  if (path.indexOf('/contact') === 0) return 'Contact page';
  return path;
}

function recipients() {
  var raw = process.env.QUOTE_NOTIFY_TO || FALLBACK_TO;
  var list = raw.split(',').map(function (address) {
    return address.trim();
  }).filter(function (address) {
    return EMAIL_RE.test(address);
  });
  return list.length ? list : [FALLBACK_TO];
}

/* Mirrors the client side checks in assets/js/main.js. The client copy is a
   convenience for the visitor, not a guarantee: anything can POST here. */
function validate(fields) {
  if (fields.name.length < 2) return 'Please enter your full name.';
  if (!PHONE_RE.test(fields.phone)) return 'Please enter a valid phone number.';
  if (!EMAIL_RE.test(fields.email)) return 'Please enter a valid email address.';
  if (fields.details.length < 10) return 'Please describe your project.';

  if (fields.name.length > MAX_SHORT ||
      fields.phone.length > MAX_SHORT ||
      fields.email.length > MAX_SHORT ||
      fields.service.length > MAX_SHORT) return 'One of the fields is too long.';
  if (fields.details.length > MAX_DETAILS) return 'Your project description is too long.';

  return null;
}

function buildText(fields) {
  return 'New quote request from mlhrenovations.ca\n\n' +
    'Name: ' + fields.name + '\n' +
    'Phone: ' + fields.phone + '\n' +
    'Email: ' + fields.email + '\n' +
    'Service: ' + fields.service + '\n' +
    'Submitted from: ' + fields.source + '\n\n' +
    'Project details:\n' + fields.details + '\n\n' +
    'Reply to this email to answer ' + fields.name + ' directly.\n';
}

function buildHtml(fields) {
  var row = function (label, value) {
    return '<tr>' +
      '<td style="padding:6px 14px 6px 0;color:#667085;white-space:nowrap;vertical-align:top">' + escapeHtml(label) + '</td>' +
      '<td style="padding:6px 0;color:#101828"><strong>' + escapeHtml(value) + '</strong></td>' +
      '</tr>';
  };

  return '<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#101828">' +
    '<h2 style="margin:0 0 4px;font-size:19px">New quote request</h2>' +
    '<p style="margin:0 0 18px;color:#667085;font-size:14px">Sent from the quote form on mlhrenovations.ca</p>' +
    '<table style="border-collapse:collapse;margin-bottom:18px">' +
      row('Name', fields.name) +
      row('Phone', fields.phone) +
      row('Email', fields.email) +
      row('Service', fields.service) +
      row('Page', fields.source) +
    '</table>' +
    '<p style="margin:0 0 6px;color:#667085;font-size:14px">Project details</p>' +
    '<div style="padding:12px 14px;background:#f6f7f9;border-radius:6px;white-space:pre-wrap">' +
      escapeHtml(fields.details) +
    '</div>' +
    '<p style="margin:18px 0 0;color:#667085;font-size:13px">Reply to this email to answer ' +
      escapeHtml(fields.name) + ' directly.</p>' +
    '</div>';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  var body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : {};
  } catch (err) {
    return res.status(400).json({ ok: false, error: 'Could not read the submission.' });
  }

  /* Honeypot. Answer 200 so the bot records a success and moves on rather
     than retrying or probing for what tripped it. */
  if (str(body._gotcha)) {
    return res.status(200).json({ ok: true });
  }

  var fields = {
    name: str(body.name),
    phone: str(body.phone),
    email: str(body.email),
    service: str(body.service) || 'Not specified',
    details: str(body.details),
    source: pageLabel(str(body.source) || 'unknown')
  };

  var problem = validate(fields);
  if (problem) {
    return res.status(400).json({ ok: false, error: problem });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('quote: RESEND_API_KEY is not set on this deployment');
    return res.status(502).json({ ok: false, error: 'Email is not configured.' });
  }

  var subject = oneLine('New quote request: ' + fields.service + ' (' + fields.name + ')');

  try {
    var response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: recipients(),
        /* So hitting Reply in the inbox goes to the customer, not the site. */
        reply_to: oneLine(fields.email),
        subject: subject,
        text: buildText(fields),
        html: buildHtml(fields)
      })
    });

    if (!response.ok) {
      var detail = await response.text();
      console.error('quote: resend returned ' + response.status + ' ' + detail);
      return res.status(502).json({ ok: false, error: 'We could not send your request.' });
    }
  } catch (err) {
    console.error('quote: request to resend failed', err);
    return res.status(502).json({ ok: false, error: 'We could not send your request.' });
  }

  return res.status(200).json({ ok: true });
};
