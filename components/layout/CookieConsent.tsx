"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconCookie } from "@tabler/icons-react";
import { setCookieConsent } from "@/actions/cookieConsent";

interface CookieConsentProps {
  readonly onAcceptCallback?: () => void;
  readonly onDeclineCallback?: () => void;
}

export default function CookieConsent({
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}: Readonly<CookieConsentProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    setCookieConsent();
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback();
  };

  const decline = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    onDeclineCallback();
  };

  useEffect(() => {
    let consentGiven = false;
    try {
      consentGiven = document.cookie.includes("cookieConsent=true");
    } catch (e) {
      console.error("Error accessing document.cookie:", e);
    }

    if (!consentGiven) {
      setIsOpen(true);
    } else {
      setHide(true);
    }
  }, []);

  if (hide) {
    return null;
  }

  return (
    <div
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[200] w-full duration-700 md:bottom-4 md:left-4 md:max-w-md",
        !isOpen
          ? "translate-y-8 opacity-0 transition-[opacity,transform]"
          : "translate-y-0 opacity-100 transition-[opacity,transform]"
      )}
    >
      <div className="m-3 rounded-md border border-border bg-background shadow-lg dark:bg-card">
        <div className="grid gap-2">
          <div className="flex h-14 items-center justify-between border-b border-border p-4">
            <h3
              id="cookie-consent-title"
              className="text-lg font-medium text-foreground"
            >
              We use cookies
            </h3>
            <IconCookie className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
          </div>
          <div className="p-4">
            <p
              id="cookie-consent-description"
              className="text-start text-sm font-normal"
            >
              We use cookies to ensure you get the best experience on our
              website. For more information on how we use cookies, please see
              our cookie policy.
              <br />
              <br />
              <span className="text-xs">
                By clicking &quot;Accept&quot;, you agree to our use of cookies.
              </span>
              <br />
              <Link href="/privacy" className="text-xs underline">
                Learn more.
              </Link>
            </p>
          </div>
          <div className="flex gap-3 border-t border-border p-4 dark:bg-muted/50">
            <Button onClick={accept} className="w-full" size="sm">
              Accept
            </Button>
            <Button
              onClick={decline}
              className="w-full"
              variant="outline"
              size="sm"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
