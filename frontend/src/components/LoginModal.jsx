import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DEMO_CREDENTIALS } from "@/data";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Check demo credentials
    const match = Object.values(DEMO_CREDENTIALS).find(
      (cred) => cred.id === memberId && cred.password === password
    );

    if (match) {
      onLogin({ id: match.id, role: match.role });
    } else {
      setError("Invalid credentials. Try: member / naqaab2025 or board / naqaab#board");
    }
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
            data-testid="login-modal"
            className="fixed top-0 right-0 bottom-0 z-[151] w-full max-w-md flex items-center"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div
              className="w-full p-8 m-4"
              style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl tracking-[0.1em]" style={{ color: "var(--gold)" }}>
                  MEMBER LOGIN
                </h2>
                <button
                  data-testid="close-login-modal"
                  onClick={onClose}
                  className="text-[var(--dim-white)] hover:text-[var(--white)] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-meta text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--dim-white)" }}>
                    MEMBER ID
                  </label>
                  <input
                    data-testid="login-member-id"
                    type="text"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="e.g. NAQ-2025-001"
                    required
                    className="w-full p-3 font-body text-sm bg-transparent outline-none transition-colors focus:border-[var(--gold)]"
                    style={{ border: "1px solid var(--deep-grey)", color: "var(--white)" }}
                  />
                </div>

                <div>
                  <label className="block font-meta text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--dim-white)" }}>
                    PASSWORD
                  </label>
                  <input
                    data-testid="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 font-body text-sm bg-transparent outline-none transition-colors focus:border-[var(--gold)]"
                    style={{ border: "1px solid var(--deep-grey)", color: "var(--white)" }}
                  />
                </div>

                {error && (
                  <p
                    data-testid="login-error"
                    className="font-body text-xs"
                    style={{ color: "var(--crimson)" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  data-testid="login-submit-btn"
                  type="submit"
                  className="w-full font-meta text-xs tracking-[0.2em] uppercase py-4 transition-all duration-300 hover:bg-[var(--white)] hover:text-[var(--black)]"
                  style={{ background: "var(--gold)", color: "var(--black)" }}
                >
                  LOGIN
                </button>
              </form>

              <p className="font-body text-[10px] mt-6 text-center" style={{ color: "var(--dim-white)", opacity: 0.5 }}>
                Demo: member / naqaab2025 &middot; board / naqaab#board
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
