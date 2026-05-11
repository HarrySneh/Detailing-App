import { useState } from "react";
import type { FormEvent } from "react";
export default function ZipCodeChecker() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    setStatus("checking");
    setTimeout(() => {
      // Simulate API call
      if (zip === "30301" || zip.startsWith("30")) {
        setStatus("available");
      } else {
        setStatus("unavailable");
      }
    }, 800);
  };

  return (
    <section className="py-12 text-center bg-amber-500/5">
      <div className="max-w-md mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">
          Check Your <span className="text-amber-400">Zip Code</span>
        </h2>
        <form onSubmit={handleCheck} className="flex gap-2 mt-6">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="e.g. 30301"
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            maxLength={5}
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded"
          >
            Check
          </button>
        </form>
        {status === "checking" && (
          <p className="mt-4 text-gray-400">Checking...</p>
        )}
        {status === "available" && (
          <p className="mt-4 text-green-400">✅ We cover your area!</p>
        )}
        {status === "unavailable" && (
          <p className="mt-4 text-red-400">❌ Sorry, not yet in your area.</p>
        )}
      </div>
    </section>
  );
}
