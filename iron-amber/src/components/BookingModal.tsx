import { useState } from "react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "service" | "contact" | "confirm";

const services = [
  "Ceramic Coating",
  "Paint Correction",
  "Interior Detailing",
  "Full Detail Package",
];

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!open) return null;

  const handleNext = () => {
    if (step === "service" && selectedService) setStep("contact");
    if (step === "contact" && name && email && phone && agreed)
      setStep("confirm");
  };

  const handleBack = () => {
    if (step === "contact") setStep("service");
    if (step === "confirm") setStep("contact");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        import.meta.env.VITE_FORMSPREE_URL || "https://formspree.io/f/xkoykyva",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: selectedService,
            name,
            email,
            phone,
            agreed,
          }),
        },
      );

      if (response.ok) {
        // Reset form
        setStep("service");
        setSelectedService("");
        setName("");
        setEmail("");
        setPhone("");
        setAgreed(false);
        onClose();
        alert("Booking submitted! We’ll contact you shortly.");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ... (the JSX stays identical, just replace the confirm button section)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 w-full max-w-lg mx-4 rounded-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          {step === "service" && "Select a Service"}
          {step === "contact" && "Your Contact Details"}
          {step === "confirm" && "Confirm Booking"}
        </h2>

        {step === "service" && (
          <div className="space-y-3">
            {services.map((svc) => (
              <button
                key={svc}
                onClick={() => setSelectedService(svc)}
                className={`w-full text-left px-4 py-3 rounded border ${
                  selectedService === svc
                    ? "border-amber-500 bg-amber-500/10 text-amber-400"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                {svc}
              </button>
            ))}
          </div>
        )}

        {step === "contact" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            />
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                className="text-amber-400 underline"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Service:</strong> {selectedService}
            </p>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>

            {submitError && (
              <p className="text-red-400 text-sm mt-2">{submitError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-4 w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 rounded disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step !== "service" && (
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white"
            >
              ← Back
            </button>
          )}
          {step !== "confirm" && (
            <button
              onClick={handleNext}
              className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2 rounded ml-auto"
              disabled={
                (step === "service" && !selectedService) ||
                (step === "contact" && (!name || !email || !phone || !agreed))
              }
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
