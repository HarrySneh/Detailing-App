import { useState, FormEvent } from "react";

export default function PostalCodeChecker() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");

  const formatPostalCode = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleaned.length <= 3) return cleaned;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
  };

  const isValid = (val: string) => /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(val);

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid(code)) return;
    setStatus("checking");
    setTimeout(() => {
      // Toronto area codes start with "M"
      if (code.startsWith("M")) {
        setStatus("available");
      } else {
        setStatus("unavailable");
      }
    }, 800);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-amber-500/5">
      <div className="max-w-lg mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Check Your <span className="text-amber-400">Postal Code</span>
        </h2>
        <p className="text-gray-400 mb-8">
          Enter your postal code to see if we cover your area in the GTA.
        </p>
        <form
          onSubmit={handleCheck}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(formatPostalCode(e.target.value))}
            placeholder="e.g. M5V 2H1"
            className="flex-1 px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-wider"
            maxLength={7}
          />
          <button
            type="submit"
            disabled={!isValid(code)}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Check
          </button>
        </form>
        {status === "checking" && (
          <p className="mt-6 text-gray-400 animate-pulse">
            Checking your location…
          </p>
        )}
        {status === "available" && (
          <p className="mt-6 text-green-400 font-semibold">
            ✅ Great news! We cover your area.
          </p>
        )}
        {status === "unavailable" && (
          <p className="mt-6 text-red-400 font-semibold">
            ❌ Sorry, we haven’t reached your area yet. Stay tuned!
          </p>
        )}
      </div>
    </section>
  );
}
