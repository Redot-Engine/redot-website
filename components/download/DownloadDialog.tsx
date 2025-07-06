"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { IconArchive, IconDownload } from "@tabler/icons-react";
import { VERSIONS } from "@/constants/download/versions";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArchiveVersion,
  ArchiveVersionSelector,
} from "@/components/download/ArchiveVersionSelector";
import { capitalizeFirstLetter } from "@/lib/utils";

interface DownloadDialogProps {
  readonly platform: string;
  readonly arch: string;
}

export default function DownloadDialog({
  platform,
  arch,
}: Readonly<DownloadDialogProps>) {
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState("stable");
  const [selectedTab, setSelectedTab] = useState("current");
  const [selectedArchiveVersion, setSelectedArchiveVersion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [archiveVersions, setArchiveVersions] = useState<ArchiveVersion[]>([]);
  const [loadingVersions, setLoadingVersions] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const t = useTranslations("downloadDialog");

  useEffect(() => {
    if (open && selectedTab === "archive") {
      fetchArchiveVersions();
    }
  }, [open, selectedTab]);

  const fetchArchiveVersions = async () => {
    setLoadingVersions(true);
    setLoadError(null);
    try {
      const response = await fetch(
        `/api/download/versions?platform=${platform}&arch=${arch}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch versions");
      }
      const data = await response.json();

      setArchiveVersions(data.versions);
      if (data.versions.length > 0 && !selectedArchiveVersion) {
        setSelectedArchiveVersion(data.versions[0].version);
      }
    } catch (err) {
      console.error("Error fetching archive versions:", err);
      setLoadError(t("archive.loadError"));
    } finally {
      setLoadingVersions(false);
    }
  };

  const fetchDownloadUrl = async (isArchive = false) => {
    if (isArchive && selectedArchiveVersion) {
      const response = await fetch(
        `/api/download/versions?platform=${platform}&arch=${arch}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch download URL");
      }
      const data = await response.json();
      const version = data.versions.find(
        (v: any) => v.version === selectedArchiveVersion
      );
      return version?.assets[0]?.download_url;
    }

    const response = await fetch(
      `/api/download?platform=${platform}&arch=${arch}&channel=${version}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch download URL");
    }
    const data = await response.json();
    return data.url;
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const isArchive = selectedTab === "archive";
      window.location.href = await fetchDownloadUrl(isArchive);
      setTimeout(() => setOpen(false), 300);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDownloadButtonText = () => {
    if (isLoading) {
      return t("downloading");
    }
    if (selectedTab === "archive") {
      return t("archive.downloadArchive", { version: selectedArchiveVersion });
    }
    return `Download ${version.charAt(0).toUpperCase() + version.slice(1)} Version`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="dark px-8">
          <IconDownload className="mr-2 h-5 w-5" />
          {t("downloadButton")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="current"
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">{t("currentVersions")}</TabsTrigger>
            <TabsTrigger value="archive">{t("archive.name")}</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="py-4">
            <RadioGroup
              value={version}
              onValueChange={setVersion}
              className="space-y-4"
            >
              {VERSIONS.filter(
                (v) => !(platform === "android" && v.id === "mono")
              ).map((v) => (
                <Card
                  key={v.id}
                  className={`transition-all ${version === v.id ? "border-primary" : "hover:border-primary/50"}`}
                >
                  <CardContent className="flex items-center space-x-4 p-4">
                    <RadioGroupItem
                      value={v.id}
                      id={v.id}
                      className="sr-only"
                    />
                    <v.icon
                      className={`h-6 w-6 ${version === v.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <Label
                      htmlFor={v.id}
                      className="flex-grow cursor-pointer space-y-1"
                    >
                      <div className="font-semibold">{t(`${v.id}.name`)}</div>
                      <div className="text-sm text-muted-foreground">
                        {t(`${v.id}.description`)}
                      </div>
                    </Label>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </TabsContent>

          <TabsContent value="archive" className="py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <IconArchive className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Download previous releases for&nbsp;
                  {capitalizeFirstLetter(platform)}
                </span>
              </div>

              {loadingVersions ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <ArchiveVersionSelector
                  loadError={loadError}
                  selectedArchiveVersion={selectedArchiveVersion}
                  setSelectedArchiveVersion={setSelectedArchiveVersion}
                  archiveVersions={archiveVersions}
                />
              )}

              <div className="mt-2 text-pretty text-xs text-muted-foreground">
                {t("archive.note")}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <AnimatedButton
            pressEffect="medium"
            hoverEffect="lift"
            transitionSpeed="fast"
            size="lg"
            className="w-full"
            onClick={handleDownload}
            disabled={
              isLoading ||
              (selectedTab === "archive" && !selectedArchiveVersion)
            }
          >
            <IconDownload className="mr-2 h-5 w-5" />
            {getDownloadButtonText()}
          </AnimatedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
