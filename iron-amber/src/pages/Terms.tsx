import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-obsidian py-20 px-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 mb-10 transition-colors"
      >
        ← Back to Home
      </Link>
      <h1 className="text-4xl font-extrabold text-white mb-10">
        Terms & Conditions
      </h1>
      <div className="prose prose-invert text-gray-300 space-y-6">
        <p>
          <strong className="text-white">1. Service Area</strong>
          <br />
          Our mobile detailing services are available across the Greater Toronto
          Area (GTA). Additional travel fees may apply for locations outside
          central Toronto. Please check your postal code or contact us for
          confirmation.
        </p>
        <p>
          <strong className="text-white">2. Booking & Cancellation</strong>
          <br />A valid credit card is required to secure your appointment.
          Cancellations or rescheduling must be made at least 24 hours in
          advance to avoid a 50% service fee.
        </p>
        <p>
          <strong className="text-white">3. Satisfaction Guarantee</strong>
          <br />
          We stand behind every job. If you’re not completely satisfied, we’ll
          return within 48 hours to make it right — at no additional cost.
        </p>
        <p>
          <strong className="text-white">4. Liability</strong>
          <br />
          Iron & Amber is fully insured. While we treat every vehicle with the
          utmost care, we are not responsible for pre‑existing damage or
          mechanical issues uncovered during detailing.
        </p>
        <p className="text-sm text-gray-500 mt-10">Last updated: March 2026</p>
      </div>
    </div>
  );
}
