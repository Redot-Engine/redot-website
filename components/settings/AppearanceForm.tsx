"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import {
  getSettingsBlogLayout,
  saveSettingsBlogLayout,
} from "@/actions/settings";

export const AppearanceForm = () => {
  const [selectedLayout, setSelectedLayout] = useState<string>("new");

  useEffect(() => {
    const fetchLayout = async () => {
      const layout = await getSettingsBlogLayout();
      setSelectedLayout(layout);
    };
    fetchLayout();
  }, []);

  const handleLayoutChange = async (value: string) => {
    setSelectedLayout(value);
    await saveSettingsBlogLayout(value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    value: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleLayoutChange(value);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Label>Blog Layout</Label>
        <p className="text-muted-foreground text-sm">
          Choose how your blog posts are displayed
        </p>
        <RadioGroup
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
          value={selectedLayout}
          onValueChange={handleLayoutChange}
        >
          <div
            role="button"
            tabIndex={0}
            className="[&:has([data-state=checked])>div]:border-primary"
            onClick={() => handleLayoutChange("new")}
            onKeyDown={(event) => handleKeyDown(event, "new")}
          >
            <RadioGroupItem value="new" className="sr-only" />
            <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
              <div className="space-y-2 rounded-sm bg-white p-2 shadow-xs">
                <div className="flex flex-col items-center gap-2 p-2">
                  <div className="h-4 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-4 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex flex-row items-center justify-center gap-2 p-2">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-3 w-[40px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex justify-center gap-2 p-2">
                  <div className="h-16 w-[200px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex flex-col gap-1 rounded-md bg-white p-2 shadow-xs">
                  <div className="h-2 w-[130px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[120px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              New
            </span>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="[&:has([data-state=checked])>div]:border-primary"
            onClick={() => handleLayoutChange("old")}
            onKeyDown={(event) => handleKeyDown(event, "old")}
          >
            <RadioGroupItem value="old" className="sr-only" />
            <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
              <div className="space-y-2 rounded-sm bg-white p-2 shadow-xs">
                <div className="flex justify-center gap-2 p-2">
                  <div className="h-16 w-[200px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <div className="h-4 w-[130px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex flex-row items-center gap-2 p-2">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-3 w-[40px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex flex-col gap-1 rounded-md bg-white p-2 shadow-xs">
                  <div className="h-2 w-[130px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[120px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[120px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Old
            </span>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
