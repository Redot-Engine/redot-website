import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GITHUB_OWNER = "Redot-Engine";
const GITHUB_REPO = "redot-engine";

export const runtime = "edge";

function getAssetPattern(
  platform: string,
  arch: string,
  channel: string
): RegExp {
  if (platform === "mac") {
    return channel === "mono"
      ? /_mono_macos(\.[^\.]+)?\.zip$/i
      : /_macos(\.[^\.]+)?\.zip$/i;
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

async function findAssetInReleases(
  releases: any[],
  platform: string,
  arch: string,
  channel: string
): Promise<{ asset: any; release: any } | null> {
  const assetPattern = getAssetPattern(platform, arch, channel);

  for (const release of releases) {
    const asset = release.assets.find((a: any) => assetPattern.test(a.name));
    if (asset) {
      return { asset, release };
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const channel = searchParams.get("channel");
  const platform = searchParams.get("platform");
  const arch = searchParams.get("arch");

  if (!channel || !platform || !arch) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`
    );
    const allReleases = response.data;

    if (!allReleases.length) {
      return new NextResponse("No releases found", { status: 404 });
    }

    let releases;
    if (channel === "latest") {
      releases = allReleases.sort(
        (a: any, b: any) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );
    } else {
      releases = allReleases
        .filter((r: any) => r.tag_name.endsWith("-stable"))
        .sort(
          (a: any, b: any) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        );

      if (!releases.length) {
        return new NextResponse("Stable release not found", { status: 404 });
      }
    }

    // Ищем asset в релизах
    const result = await findAssetInReleases(releases, platform, arch, channel);

    if (!result) {
      return new NextResponse("Asset not found", { status: 404 });
    }

    return NextResponse.json({
      url: result.asset.browser_download_url,
      name: result.asset.name,
      size: result.asset.size,
      release_tag: result.release.tag_name,
      release_published_at: result.release.published_at,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
