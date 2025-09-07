import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ mirrorlist: string }> }
) {
  const mirrorlist = (await params).mirrorlist;

  if (!mirrorlist.endsWith(".json")) {
    return NextResponse.json(
      { error: "Bad request: Expected .json format" },
      { status: 400 }
    );
  }

  const mirrorlistName = mirrorlist.replace(".json", "");

  console.log("mirrorlistName:", mirrorlistName);

  const regex = /^(\d+)\.(\d+)(\.(\d+))?\.(\w+)(\.(\d+))?(\.mono)?$/;
  const match = mirrorlistName.match(regex);

  if (!match) {
    return NextResponse.json(
      { error: "Bad request: Invalid version format" },
      { status: 400 }
    );
  }

  const major = match[1];
  const minor = match[2];
  const patch = match[4] || "0";
  const status = match[5];
  const statusVersion = match[7] ? `.${match[7]}` : "";
  const monoTag = match[8] ? "_mono" : "";

  const downloadPathVersion = `${major}.${minor}${patch !== "0" ? `.${patch}` : ""}-${status}${statusVersion}`;
  const templateVersion = `${major}.${minor}${patch !== "0" ? `.${patch}` : ""}-${status}${statusVersion}${monoTag}`;

  console.log("downloadPathVersion:", downloadPathVersion);
  console.log("templateVersion:", templateVersion);

  const mirrorlistResponse = {
    mirrors: [
      {
        name: "Official GitHub Releases mirror",
        url: `https://github.com/Redot-Engine/redot-engine/releases/download/redot-${downloadPathVersion}/Redot_v${templateVersion}_export_templates.tpz`,
      },
    ],
  };

  return NextResponse.json(mirrorlistResponse);
}
