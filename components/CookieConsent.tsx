"use client";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconCookie } from "@tabler/icons-react";

export default function CookieConsent({
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
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
    try {
      if (!document.cookie.includes("cookieConsent=true")) {
        setIsOpen(true);
      } else {
        setTimeout(() => {
          setHide(true);
        }, 700);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed right-0 bottom-0 left-0 z-200 w-full duration-700 md:bottom-4 md:left-4 md:max-w-md",
        !isOpen
          ? "translate-y-8 opacity-0 transition-[opacity,transform]"
          : "translate-y-0 opacity-100 transition-[opacity,transform]",
        hide && "hidden"
      )}
    >
      <div className="border-border bg-background dark:bg-card m-3 rounded-md border shadow-lg">
        <div className="grid gap-2">
          <div className="border-border flex h-14 items-center justify-between border-b p-4">
            <h1 className="text-lg font-medium">We use cookies</h1>
            <IconCookie className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-start text-sm font-normal">
              We use cookies to ensure you get the best experience on our
              website. For more information on how we use cookies, please see
              our cookie policy.
              <br />
              <br />
              <span className="text-xs">
                By clicking &quot;
                <span className="font-medium opacity-80">Accept</span>&quot;,
                you agree to our use of cookies.
              </span>
              <br />
              <Link href="/privacy" className="text-xs underline">
                Learn more.
              </Link>
            </p>
          </div>
          <div className="border-border dark:bg-background/20 flex gap-2 border-t p-4 py-5">
            <Button onClick={accept} className="w-full">
              Accept
            </Button>
            <Button onClick={decline} className="w-full" variant="secondary">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
