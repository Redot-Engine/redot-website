import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { header } from "@/constants/header";
import { IconArrowRight, IconMenu, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { socialsLinks } from "@/constants/socials";

export const MobileSidebar = () => {
  const t = useTranslations("header");

  return (
    <Sheet>
      <SheetTrigger aria-label="Open Menu">
        <IconMenu />
      </SheetTrigger>
      <SheetContent className="max-w-[350px] rounded-r-md pb-6" side="left">
        <SheetTitle className="mb-4">
          <div className="flex flex-row items-center justify-between pb-6">
            <Image
              src="/logo_large.svg"
              alt="Redot Engine Logo"
              width={160}
              height={50}
              className="invert dark:invert-0"
              priority
            />
            <SheetPrimitive.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <IconX className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          </div>
          <Separator />
        </SheetTitle>
        <div className="flex h-full flex-col items-start justify-between pb-32">
          <div className="flex w-full flex-col">
            {header.map((link) => (
              <SheetClose key={link.label} asChild>
                <Link
                  href={link.href}
                  className="flex items-center justify-between py-2 text-base font-medium hover:underline sm:px-4"
                  target={link.newTab ? "_blank" : "_self"}
                  rel={link.newTab ? "noopener noreferrer" : undefined}
                >
                  {t(link.label)}
                  {link.newTab && <IconArrowRight className="h-4 w-4" />}
                </Link>
              </SheetClose>
            ))}
          </div>

          <div className="flex w-full flex-col gap-4">
            <SheetClose asChild>
              <Button variant="outline" asChild>
                <Link className="w-full" href={socialsLinks.discord}>
                  {t("discordButton")}
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild>
                <Link className="w-full" href="/download">
                  {t("downloadButton")}
                </Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
