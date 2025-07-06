export const getPlatformDownloadLink = (platform: string): string => {
  const downloadLinks: { [key: string]: string } = {
    windows:
      "https://github.com/Redot-Engine/redot-engine/releases/download/redot-4.3-stable/Redot_v4.3-stable_win64.exe.zip",
    linux:
      "https://github.com/Redot-Engine/redot-engine/releases/download/redot-4.3-stable/Redot_v4.3-stable_linux.x86_64.zip",
    android:
      "https://github.com/Redot-Engine/redot-engine/releases/download/redot-4.3-stable/Redot_v4.3-stable_android_editor.apk",
    mac: "https://github.com/Redot-Engine/redot-engine/releases/download/redot-4.3-stable/Redot_v4.3-stable_macos.zip",
    webEditor:
      "https://github.com/Redot-Engine/redot-engine/releases/download/redot-4.3-stable/Redot_v4.3-stable_web_editor.zip",
  };

  return (
    downloadLinks[platform] ||
    "https://github.com/Redot-Engine/redot-engine/releases"
  );
};
