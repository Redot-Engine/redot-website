import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChangelogDetail } from "@/components/changelog/ChangelogDetail";
import { generateTableOfContents, getChangelogEntry } from "@/lib/changelog";
import { IconLoader2 } from "@tabler/icons-react";
import { ChangelogTableOfContents } from "@/components/changelog/ChangelogTableOfContents";

interface ChangelogEntryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ChangelogEntryPageProps) {
  const { slug } = await params;
  const entry = await getChangelogEntry(slug);

  if (!entry) {
    return {
      title: "Changelog Entry Not Found",
    };
  }

  return {
    title: `${entry.title} (v${entry.version}) | Changelog`,
    description: entry.summary[0]?.children?.[0]?.text || "",
  };
}

export default async function ChangelogEntryPage({
  params,
}: Readonly<ChangelogEntryPageProps>) {
  const { slug } = await params;
  const entry = await getChangelogEntry(slug);

  if (!entry) {
    notFound();
  }

  const tableOfContents = entry.summary
    ? generateTableOfContents(entry.summary)
    : [];

  return (
    <div className="pb-12">
      <SidebarProvider>
        <div className="flex w-full justify-center">
          <div className="w-full max-w-3xl px-6">
            <main>
              <Suspense fallback={<IconLoader2 className="animate-spin" />}>
                <ChangelogDetail entry={entry} />
              </Suspense>
            </main>
          </div>
          {tableOfContents.length > 0 && (
            <div className="lg:fixed">
              <ChangelogTableOfContents tableOfContents={tableOfContents} />
            </div>
          )}
        </div>
      </SidebarProvider>
    </div>
  );
}
