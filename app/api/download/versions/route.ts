import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/repos/Redot-Engine/redot-engine";
const GITHUB_RELEASES_URL = `${GITHUB_API_URL}/releases`;

function getAssetPattern(platform: string, arch: string): RegExp {
  if (platform === "mac") {
    return /_macos(\.[^.]+)?\.zip$/i;
  }

  if (platform === "android") {
    return /_android_editor\.apk$/i;
  }

  if (platform === "windows") {
    const winPart = {
      "32": "win32",
      "64": "win64",
      arm64: "windows_arm64",
    }[arch]!;
    return new RegExp(`_${winPart}\\.exe\\.zip$`, "i");
  }

  return new RegExp(`_${platform}\\.${arch}\\.zip$`, "i");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const arch = searchParams.get("arch");

  if (!platform || !arch) {
    return NextResponse.json(
      { error: "Platform and architecture are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(GITHUB_RELEASES_URL, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
      params: {
        per_page: 50,
      },
    });

    const assetPattern = getAssetPattern(platform, arch);

    const versions = response.data
      .filter((release: any) => {
        return release.assets.some(
          (asset: any) =>
            assetPattern.test(asset.name) &&
            !asset.name.includes("export_templates") &&
            !asset.name.includes("debug")
        );
      })
      .map((release: any) => {
        const version = release.tag_name.replace("v", "");
        const date = new Date(release.published_at).toISOString().split("T")[0];
        const filteredAssets = release.assets.filter(
          (asset: any) =>
            assetPattern.test(asset.name) &&
            !asset.name.includes("export_templates") &&
            !asset.name.includes("debug")
        );

        return {
          version,
          date,
          name: release.name || `Version ${version}`,
          prerelease: release.prerelease,
          changes: extractKeyChanges(release.body || ""),
          url: release.html_url,
          assets: filteredAssets.map((asset: any) => ({
            name: asset.name,
            size: formatBytes(asset.size),
            download_count: asset.download_count,
            download_url: asset.browser_download_url,
          })),
        };
      });

    return NextResponse.json({ versions });
  } catch (error) {
    console.error("Error fetching versions:", error);
    return NextResponse.json(
      { error: "Failed to fetch version information" },
      { status: 500 }
    );
  }
}

function extractKeyChanges(releaseBody: string): string {
  const changesSections = releaseBody.match(
    /(?:#{2,3}\s+(What's New|Changes|Features|Bugfixes)[\s\S]*?)(?=#{2,3}|$)/gi
  );

  if (changesSections && changesSections.length > 0) {
    return (
      changesSections[0]
        .replace(/#{2,3}\s+[^\n]+/, "")
        .trim()
        .slice(0, 150) + "..."
    );
  }

  const firstPara = releaseBody.split("\n\n")[0].trim();
  return firstPara.length > 150 ? firstPara.slice(0, 150) + "..." : firstPara;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
