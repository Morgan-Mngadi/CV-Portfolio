import { useEffect, useState } from "react";

const CONSENT_KEY = "morgan-cookie-consent";
const GTM_ID = "GTM-MH72J2FK";

type ConsentValue = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const loadScript = (id: string, src: string) => {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const loadAnalytics = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  loadScript("gtm-script", `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
};

const isTagManagerPreview = () => {
  const params = new URLSearchParams(window.location.search);

  return params.has("gtm_debug") || params.has("gtm_preview") || params.has("gtm_auth");
};

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    const isPreview = isTagManagerPreview();

    setConsent(storedConsent);
    setIsReady(true);

    if (storedConsent === "accepted" || isPreview) {
      loadAnalytics();
    }
  }, []);

  const saveConsent = (value: ConsentValue) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);

    if (value === "accepted") {
      loadAnalytics();
    }
  };

  if (!isReady || consent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-background/95 px-6 py-5 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-medium">Cookie consent</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            I use analytics cookies to understand portfolio visits and improve the site. You can accept or reject analytics tracking.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            onClick={() => saveConsent("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className="bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => saveConsent("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
