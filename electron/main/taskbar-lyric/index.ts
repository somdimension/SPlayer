import os from "os";
import type { BrowserWindow } from "electron";
import type { LyricLine } from "@applemusic-like-lyrics/lyric";
import { isWin } from "../utils/config";

interface TaskbarLyricState {
  playName?: string;
  artistName?: string;
  playStatus?: boolean;
  lyricIndex: number;
  lrcData: LyricLine[];
  yrcData: LyricLine[];
}

const isWindows11OrHigher = () => {
  if (!isWin) return false;
  const [major = 0, _minor = 0, build = 0] = os.release().split(".").map(Number);
  return major > 10 || (major === 10 && build >= 22000);
};

const getLyricText = (line?: LyricLine) => {
  if (!line) return "";
  const words = Array.isArray(line.words)
    ? line.words
        .map((item: any) => (typeof item?.word === "string" ? item.word : ""))
        .join("")
        .trim()
    : "";
  const mainText =
    words || (line as any)?.lyricLine?.text || (line as any)?.content || (line as any)?.text || "";
  const translation = typeof (line as any)?.translatedLyric === "string" ? line.translatedLyric.trim() : "";
  if (mainText && translation) return `${mainText} · ${translation}`;
  return (mainText || translation).trim();
};

let cachedTooltip = "";

export const updateTaskbarLyricTooltip = (win: BrowserWindow | null, state: TaskbarLyricState) => {
  if (!win || !isWindows11OrHigher()) return;
  const lyrics = state.yrcData?.length ? state.yrcData : state.lrcData;
  const lineText = getLyricText(lyrics?.[state.lyricIndex]);
  const songInfo = [state.playName, state.artistName].filter(Boolean).join(" - ") || "SPlayer";
  const tooltip = (state.playStatus === false && lineText ? `⏸ ${lineText}` : lineText) || songInfo;
  if (tooltip === cachedTooltip) return;
  cachedTooltip = tooltip;
  win.setThumbnailToolTip(tooltip);
};

export const clearTaskbarLyricTooltip = (win: BrowserWindow | null) => {
  if (!win || !isWindows11OrHigher()) return;
  cachedTooltip = "";
  win.setThumbnailToolTip("SPlayer");
};

export type { TaskbarLyricState };
