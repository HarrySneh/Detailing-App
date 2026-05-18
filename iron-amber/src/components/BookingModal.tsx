import { useState, useMemo } from "react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

// Tier definition (prices by vehicle size)
const tiers = [
  {
    name: "Amber Express",
    subtitle: "Maintenance Wash & Vac",
    prices: { sedan: 69, midSuv: 79, largeSuv: 89 },
  },
  {
    name: "Iron Core",
    subtitle: "Deep Interior OR Deep Exterior",
    prices: { sedan: 139, midSuv: 159, largeSuv: 179 },
  },
  {
    name: "The Iron & Amber Reset",
    subtitle: "The Ultimate Full Detail",
    prices: { sedan: 219, midSuv: 249, largeSuv: 279 },
  },
] as const;

// Vehicle sizes
const vehicleSizes = [
  { key: "sedan", label: "Sedan / Coupe" },
  { key: "midSuv", label: "Mid‑Size SUV / Crossover" },
  { key: "largeSuv", label: "Large SUV / Minivan / Truck" },
] as const;

type VehicleSizeKey = "sedan" | "midSuv" | "largeSuv";

// Steps
type Step = "tier" | "size" | "addons" | "contact" | "confirm";

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("tier");
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<VehicleSizeKey | "">("");
  const [saltExtraction, setSaltExtraction] = useState(false);
  const [saltSeverity, setSaltSeverity] = useState<
    "light" | "moderate" | "heavy"
  >("moderate");
  const [petHair, setPetHair] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Reset everything when modal closes
  if (!open && step !== "tier") {
    // will reset on next open
  }

  const handleClose = () => {
    setStep("tier");
    setSelectedTier("");
    setSelectedSize("");
    setSaltExtraction(false);
    setSaltSeverity("moderate");
    setPetHair(false);
    setName("");
    setEmail("");
    setPhone("");
    setAgreed(false);
    setSubmitting(false);
    setSubmitError("");
    onClose();
  };

  // Get current tier object
  const tierObj = tiers.find((t) => t.name === selectedTier);

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!selectedTier || !selectedSize || !tierObj) return 0;
    const base = tierObj.prices[selectedSize];
    let addon = 0;
    if (saltExtraction) {
      if (saltSeverity === "light") addon += 30;
      else if (saltSeverity === "moderate") addon += 40;
      else addon += 50;
    }
    if (petHair) addon += 35;
    return base + addon;
  }, [
    selectedTier,
    selectedSize,
    saltExtraction,
    saltSeverity,
    petHair,
    tierObj,
  ]);

  const handleNext = () => {
    if (step === "tier" && selectedTier) setStep("size");
    if (step === "size" && selectedSize) setStep("addons");
    if (step === "addons") setStep("contact");
    if (step === "contact" && name && email && phone && agreed)
      setStep("confirm");
  };

  const handleBack = () => {
    if (step === "size") setStep("tier");
    if (step === "addons") setStep("size");
    if (step === "contact") setStep("addons");
    if (step === "confirm") setStep("contact");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");

    const bookingData = {
      serviceTier: selectedTier,
      vehicleSize: vehicleSizes.find((v) => v.key === selectedSize)?.label,
      saltExtraction: saltExtraction
        ? `Yes (${saltSeverity}) – $${saltSeverity === "light" ? 30 : saltSeverity === "moderate" ? 40 : 50}`
        : "No",
      petHairRemoval: petHair ? "Yes – $35" : "No",
      totalPrice: `$${totalPrice}`,
      name,
      email,
      phone,
      agreed,
    };

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        handleClose(); // resets everything
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 w-full max-w-lg mx-4 rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          {step === "tier" && "Select a Service Tier"}
          {step === "size" && "Choose Your Vehicle Size"}
          {step === "addons" && "GTA Proof Add‑ons"}
          {step === "contact" && "Your Contact Details"}
          {step === "confirm" && "Confirm Your Booking"}
        </h2>

        {/* Step 1: Tier */}
        {step === "tier" && (
          <div className="space-y-3">
            {tiers.map((tier) => (
              <button
                key={tier.name}
                onClick={() => setSelectedTier(tier.name)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedTier === tier.name
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <p className="font-semibold text-white">{tier.name}</p>
                <p className="text-sm text-gray-400">{tier.subtitle}</p>
                <p className="text-xs text-amber-400 mt-1">
                  From ${Math.min(...Object.values(tier.prices))} – $
                  {Math.max(...Object.values(tier.prices))}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Vehicle Size */}
        {step === "size" && (
          <div className="space-y-3">
            {vehicleSizes.map((size) => (
              <button
                key={size.key}
                onClick={() => setSelectedSize(size.key)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedSize === size.key
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <p className="font-semibold text-white">{size.label}</p>
                <p className="text-sm text-gray-400">
                  {tierObj ? `$${tierObj.prices[size.key]}` : ""}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Add‑ons */}
        {step === "addons" && (
          <div className="space-y-5">
            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-700 hover:border-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={saltExtraction}
                onChange={(e) => setSaltExtraction(e.target.checked)}
                className="mt-1 accent-amber-500"
              />
              <div className="flex-1">
                <p className="font-semibold text-white">
                  GTA Winter Salt Extraction
                </p>
                <p className="text-sm text-gray-400">
                  Undercarriage & paint decontamination
                </p>
                {saltExtraction && (
                  <select
                    value={saltSeverity}
                    onChange={(e) =>
                      setSaltSeverity(
                        e.target.value as "light" | "moderate" | "heavy",
                      )
                    }
                    className="mt-2 bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-white"
                  >
                    <option value="light">Light ($30)</option>
                    <option value="moderate">Moderate ($40)</option>
                    <option value="heavy">Heavy ($50)</option>
                  </select>
                )}
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-700 hover:border-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={petHair}
                onChange={(e) => setPetHair(e.target.checked)}
                className="mt-1 accent-amber-500"
              />
              <div>
                <p className="font-semibold text-white">Pet Hair Removal</p>
                <p className="text-sm text-gray-400">
                  Specialised tools for stubborn hair
                </p>
                <p className="text-xs text-amber-400 mt-1">+$35</p>
              </div>
            </label>
          </div>
        )}

        {/* Step 4: Contact */}
        {step === "contact" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-amber-500"
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

        {/* Step 5: Confirm */}
        {step === "confirm" && (
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-white">Service:</strong> {selectedTier}
            </p>
            <p>
              <strong className="text-white">Vehicle:</strong>{" "}
              {vehicleSizes.find((v) => v.key === selectedSize)?.label}
            </p>
            <p>
              <strong className="text-white">Salt Extraction:</strong>{" "}
              {saltExtraction ? `Yes (${saltSeverity})` : "No"}
            </p>
            <p>
              <strong className="text-white">Pet Hair Removal:</strong>{" "}
              {petHair ? "Yes" : "No"}
            </p>
            <p className="text-xl font-bold text-amber-400 mt-2">
              Total: ${totalPrice}
            </p>
            <hr className="border-gray-700 my-3" />
            <p>
              <strong className="text-white">Name:</strong> {name}
            </p>
            <p>
              <strong className="text-white">Email:</strong> {email}
            </p>
            <p>
              <strong className="text-white">Phone:</strong> {phone}
            </p>

            {submitError && (
              <p className="text-red-400 text-sm mt-2">{submitError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-4 w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-lg disabled:opacity-50 transition-colors"
            >
              {submitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step !== "tier" && (
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
          )}
          {step !== "confirm" && (
            <button
              onClick={handleNext}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-2 rounded-lg transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                (step === "tier" && !selectedTier) ||
                (step === "size" && !selectedSize) ||
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
