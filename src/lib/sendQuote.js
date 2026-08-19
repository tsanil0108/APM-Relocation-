// ---------------------------------------------------------------------------
// Shared form-submission helper.
//
// EVERY form on the site (Home hero, entry popup, Branches "Get Free Quote",
// Contact page) calls this ONE function, so wiring up email delivery only
// has to be done once, in one place.
//
// It uses Web3Forms (https://web3forms.com) — a free service that forwards
// form submissions straight to your inbox with no backend/server needed.
//
// SETUP (2 minutes):
//   1. Go to https://web3forms.com and enter the email where you want to
//      receive enquiries. They'll email you a free "Access Key" instantly —
//      no signup, no credit card.
//   2. Paste that key below as WEB3FORMS_ACCESS_KEY (or, better, set it as
//      an env var VITE_WEB3FORMS_KEY in a .env file so it isn't hardcoded).
//   3. Done — every form on the site will now email you on submit.
//
// The free plan covers 250 submissions/month, which is plenty for a
// business enquiry form.
// ---------------------------------------------------------------------------

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Sends a quote/enquiry form submission by email.
 * @param {Object} data - form fields (name, phone, email, moveType, from, to, moveDate, message, source)
 * @returns {Promise<Object>} the API response on success
 * @throws {Error} with a human-readable message on failure
 */
export async function sendQuoteEmail(data) {
  if (WEB3FORMS_ACCESS_KEY === "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
    // Fails loudly in development so it's obvious the key still needs setting,
    // instead of silently pretending the email was sent.
    throw new Error(
      "Email delivery isn't set up yet — add your free Web3Forms access key in src/lib/sendQuote.js"
    );
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New Moving Enquiry — ${data.name || "Website Visitor"} (${data.moveType || "General"})`,
    from_name: "APM Relocation Website",
    ...data,
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Something went wrong. Please try again.");
  }

  return result;
}