import { useState, useCallback, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import IntroAnimation from "@/components/IntroAnimation";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import TechSection from "@/components/TechSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import Footer from "@/components/Footer";

const INTRO_SEEN_KEY = "esc:intro-seen";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* storage unavailable (private mode) */
    }
    setIntroComplete(true);
  }, []);

  // Skip the intro on repeat visits within the same session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_SEEN_KEY)) setIntroComplete(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return (
    <div className="noise-overlay">
      <CustomCursor />
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <div>
        <main>
          <HeroSection />
          <ClientsSection />
          <TechSection />
          <ProcessSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingChat />
      </div>
    </div>
  );
};

export default Index;
