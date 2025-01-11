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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useTranslations } from "next-intl";
import { setLanguage, getLanguage } from "@/actions/language";

export default function LanguageSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("en");

  React.useEffect(() => {
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
    <div className="">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            aria-controls="language-selector-list"
            className="flex items-center justify-between gap-2 text-white dark:text-zinc-900"
            disabled={!value}
          >
            <Image
              src={`/flags/${language.find((lang) => lang.value === value)?.code}.svg`}
              alt={
                language.find((lang) => lang.value === value)?.label as string
              }
              width="20"
              height="15"
              className="mr-2 rounded"
            />
            {value
              ? language.find((lang) => lang.value === value)?.label
              : t("languageSelector.searchPlaceholder")}
            <IconChevronDown className="h-4 w-4 opacity-80" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0">
          <Command>
            <CommandInput
              placeholder={t("languageSelector.searchPlaceholder")}
            />
            <CommandList>
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
