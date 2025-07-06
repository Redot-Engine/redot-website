"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IconCheck, IconSelector, IconX } from "@tabler/icons-react";

interface BlogFiltersProps {
  readonly tags: Tag[];
  readonly selectedTags: string[];
  readonly search: string;
  readonly onTagsChange: (tagSlugs: string[]) => void;
  readonly onSearchChange: (value: string) => void;
}

export const BlogFilters = ({
  tags,
  selectedTags,
  search,
  onTagsChange,
  onSearchChange,
}: BlogFiltersProps) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("blog");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleTagSelect = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      onTagsChange(selectedTags.filter((slug) => slug !== tagSlug));
    } else {
      onTagsChange([...selectedTags, tagSlug]);
    }
  };

  const handleTagRemove = (tagSlug: string) => {
    onTagsChange(selectedTags.filter((slug) => slug !== tagSlug));
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  const getSelectedTagNames = () => {
    return selectedTags
      .map((slug) => tags.find((tag) => tag.slug.current === slug)?.name)
      .filter(Boolean);
  };

  const getTagSelectionText = () => {
    if (selectedTags.length === 0) {
      return t("selectTags");
    }
    return `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""} selected`;
  };

  return (
    <div className="mb-8 mt-4 flex flex-col items-start justify-between gap-4 px-5 md:flex-row lg:px-40">
      <div className="flex w-full flex-col gap-3 md:w-auto">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              aria-expanded={open}
              className="w-full justify-between md:w-[300px]"
            >
              {getTagSelectionText()}
              <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 md:w-[300px]">
            <Command>
              <CommandInput placeholder={t("searchTags")} />
              <CommandList
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <CommandEmpty>{t("noTagsFound")}</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag.slug.current}
                      value={tag.name}
                      onSelect={() => handleTagSelect(tag.slug.current)}
                    >
                      <IconCheck
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTags.includes(tag.slug.current)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {tag.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {getSelectedTagNames().map((tagName, index) => {
              const tagSlug = selectedTags[index];
              return (
                <Badge
                  key={tagSlug}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tagName}
                  <IconX
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleTagRemove(tagSlug)}
                  />
                </Badge>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllTags}
              className="h-6 px-2 text-xs"
            >
              {t("clearAll")}
            </Button>
          </div>
        )}
      </div>

      <div className="w-full md:w-80">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>
    </div>
  );
};
