import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { language } from "@/constants/language";
import { IconChevronDown } from "@tabler/icons-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { setLanguage, getLanguage } from "@/actions/language";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("en");

  useEffect(() => {
    const fetchLanguage = async () => {
      const currentLanguage = await getLanguage();
      setValue(currentLanguage);
    };
    fetchLanguage();
  }, []);

  const t = useTranslations("footer");

  const handleLanguageChange = (currentValue: string) => {
    if (currentValue !== value) {
      setValue(currentValue);
      setLanguage(currentValue);
      setOpen(false);
    }
  };

  return (
    <div className="dark">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-between"
            aria-expanded={open}
          >
            <Image
              src={`/flags/${language.find((lang) => lang.value === value)?.code}.svg`}
              alt={
                language.find((lang) => lang.value === value)?.label as string
              }
              width="20"
              height="15"
              className="mr-2 rounded"
              priority
            />
            {value
              ? language.find((lang) => lang.value === value)?.label
              : t("languageSelector.searchPlaceholder")}
            <IconChevronDown className="h-4 w-4 opacity-80" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0">
          <Command>
            <CommandInput
              placeholder={t("languageSelector.searchPlaceholder")}
            />
            <CommandList
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              <CommandEmpty>{t("languageSelector.noResults")}</CommandEmpty>
              <CommandGroup>
                {language.map((lang) => (
                  <CommandItem
                    key={lang.value}
                    value={lang.value}
                    onSelect={() => handleLanguageChange(lang.value)}
                  >
                    <Image
                      src={`/flags/${lang.code}.svg`}
                      alt={`${lang.label} language`}
                      width="20"
                      height="15"
                      className="rounded"
                    />
                    {lang.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === lang.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
