import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-foreground text-background p-4 lg:p-6 border-t border-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-semibold text-sm lg:text-base mb-2">
            Cookie Consent
          </h3>
          <p className="text-xs lg:text-sm leading-relaxed">
            We use essential cookies to provide you with the best experience on our website. 
            These cookies help us remember your preferences and improve site functionality.
            No personal data is collected without your explicit consent.
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0 w-full lg:w-auto">
          <button
            onClick={handleReject}
            className="flex-1 lg:flex-none px-4 py-2 border border-background text-xs lg:text-sm font-medium hover:bg-background hover:text-foreground transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 lg:flex-none px-4 py-2 bg-background text-foreground text-xs lg:text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
