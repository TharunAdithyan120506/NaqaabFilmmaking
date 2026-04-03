import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MOCK_SUBMISSIONS } from "@/data";

const INTEREST_OPTIONS = [
  "Cinematography", "Editing", "Screenwriting", "Sound Design",
  "Acting", "Direction", "Marketing", "HR",
];

const YEAR_OPTIONS = ["1st", "2nd", "3rd", "4th"];

export default function InterestFormModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "", regNo: "", dept: "", year: "", email: "", phone: "",
    interests: [], reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("naqaab_submissions") || "null") || MOCK_SUBMISSIONS;
    existing.push(form);
    localStorage.setItem("naqaab_submissions", JSON.stringify(existing));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", regNo: "", dept: "", year: "", email: "", phone: "", interests: [], reason: "" });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[150]"
            style={{ background: "rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            data-testid="interest-form-modal"
            className="fixed top-0 right-0 bottom-0 z-[151] w-full max-w-lg overflow-y-auto"
            style={{ background: "var(--black)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl tracking-[0.1em]" style={{ color: "var(--gold)" }}>
                  JOIN NAQAAB
                </h2>
                <button
                  data-testid="close-interest-form"
                  onClick={onClose}
                  className="text-[var(--dim-white)] hover:text-[var(--white)] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="font-display text-3xl mb-4" style={{ color: "var(--gold)" }}>
                    APPLICATION SUBMITTED
                  </p>
                  <p className="font-body text-sm" style={{ color: "var(--dim-white)" }}>
                    We'll reach out before the next recruitment drive.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: "name", label: "Full Name", type: "text" },
                    { key: "regNo", label: "Registration Number", type: "text" },
                    { key: "dept", label: "Department", type: "text" },
                    { key: "email", label: "Email (MIT Learner)", type: "email" },
                    { key: "phone", label: "Phone", type: "tel" },
                  ].map(({ key, label, type }) => (
                    <div key={key} className="relative">
                      <label className="block font-meta text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--dim-white)" }}>
                        {label}
                      </label>
                      <input
                        data-testid={`interest-form-${key}`}
                        type={type}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        required
                        className="w-full p-3 font-body text-sm bg-transparent outline-none transition-colors focus:border-[var(--gold)]"
                        style={{ background: "transparent", border: "1px solid var(--deep-grey)", color: "var(--white)" }}
                      />
                    </div>
                  ))}

                  {/* Year dropdown */}
                  <div>
                    <label className="block font-meta text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--dim-white)" }}>
                      Year of Study
                    </label>
                    <select
                      data-testid="interest-form-year"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      required
                      className="w-full p-3 font-body text-sm outline-none transition-colors focus:border-[var(--gold)]"
                      style={{ background: "var(--off-black)", border: "1px solid var(--deep-grey)", color: "var(--white)" }}
                    >
                      <option value="">Select Year</option>
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>{y} Year</option>
                      ))}
                    </select>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block font-meta text-[9px] tracking-[0.15em] uppercase mb-3" style={{ color: "var(--dim-white)" }}>
                      Areas of Interest
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          data-testid={`interest-option-${interest.toLowerCase()}`}
                          onClick={() => toggleInterest(interest)}
                          className="font-meta text-[10px] tracking-[0.1em] px-3 py-1.5 transition-all"
                          style={{
                            background: form.interests.includes(interest) ? "var(--gold)" : "transparent",
                            color: form.interests.includes(interest) ? "var(--black)" : "var(--dim-white)",
                            border: form.interests.includes(interest) ? "1px solid var(--gold)" : "1px solid var(--deep-grey)",
                          }}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block font-meta text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--dim-white)" }}>
                      Why do you want to join Naqaab? (200 chars max)
                    </label>
                    <textarea
                      data-testid="interest-form-reason"
                      value={form.reason}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) setForm({ ...form, reason: e.target.value });
                      }}
                      rows={3}
                      className="w-full p-3 font-body text-sm bg-transparent outline-none resize-none transition-colors focus:border-[var(--gold)]"
                      style={{ background: "transparent", border: "1px solid var(--deep-grey)", color: "var(--white)" }}
                    />
                    <p className="font-meta text-[9px] mt-1 text-right" style={{ color: "var(--dim-white)" }}>
                      {form.reason.length}/200
                    </p>
                  </div>

                  <button
                    data-testid="submit-application-btn"
                    type="submit"
                    className="w-full font-meta text-xs tracking-[0.2em] uppercase py-4 transition-all duration-300 hover:bg-[var(--white)] hover:text-[var(--black)]"
                    style={{ background: "var(--gold)", color: "var(--black)" }}
                  >
                    SUBMIT APPLICATION
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
