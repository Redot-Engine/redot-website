import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const runtime = "edge";

const GITHUB_OWNER = "Redot-Engine";
const GITHUB_REPO = "redot-engine";

function getAssetPattern(
  platform: string,
  arch: string,
  channel: string
): RegExp {
  if (platform === "mac") {
    return channel === "mono"
      ? /_mono_macos(\.[^.]+)?\.zip$/i
      : /_macos(\.[^.]+)?\.zip$/i;
  }

  if (platform === "android") {
    return /_android_editor\.apk$/i;
  }

  if (channel === "mono") {
    if (platform === "windows") {
      const winPart = {
        "32": "win32",
        "64": "win64",
        arm64: "windows_arm64",
      }[arch]!;
      return new RegExp(`_mono_${winPart}\\.zip$`, "i");
    }
    return new RegExp(`_mono_${platform}_${arch}\\.zip$`, "i");
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const channel = searchParams.get("channel");
  const platform = searchParams.get("platform");
  const arch = searchParams.get("arch");

  if (!platform || !arch || !channel) {
    return NextResponse.json(
      { error: "Platform, architecture, and channel are required" },
      { status: 400 }
    );
  }

  try {
    let release;
    if (channel === "latest") {
      const response = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          },
        }
      );
      const allReleases = response.data;

      if (!allReleases.length) {
        return new NextResponse("No releases found", { status: 404 });
      }

      allReleases.sort(
        (a: any, b: any) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );

      release = allReleases[0];
    } else {
      const response = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          },
        }
      );
      const stableReleases = response.data
        .filter((r: any) => r.tag_name.endsWith("-stable"))
        .sort(
          (a: any, b: any) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        );

      if (!stableReleases.length) {
        return new NextResponse("Stable release not found", { status: 404 });
      }
      release = stableReleases[0];
    }

    const assetPattern = getAssetPattern(platform, arch, channel);
    const asset = release.assets.find((a: any) => assetPattern.test(a.name));

    if (!asset) {
      return new NextResponse("Asset not found", { status: 404 });
    }

    return NextResponse.json({
      url: asset.browser_download_url,
      name: asset.name,
      size: asset.size,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
