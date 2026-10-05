import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import escLogo from "@/assets/esc-logo.svg";

/** Full-screen logo shown on the first visit of a session. It covers the page while the page underneath is already painted. */
const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1200);
    const t2 = setTimeout(() => onComplete(), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="intro"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, hsla(0,0%,100%,0.03) 0%, transparent 65%)",
        }}
        animate={{ scale: [0.7, 1.3, 0.7], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={escLogo}
        alt=""
        className="w-32 md:w-44 h-auto"
        style={{ filter: "drop-shadow(0 0 60px hsla(0,0%,100%,0.04))" }}
        initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
};

export default IntroAnimation;
