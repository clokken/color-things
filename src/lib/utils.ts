import { BitUtils } from "./bit-utils";
import { AppMode, BitDepth } from "./types";

export module Utils {
  export const APP_MODE_BITS: Record<AppMode, [BitDepth, BitDepth]> = {
    '8to4': [8, 4],
    '4to8': [4, 8],
    '8to5': [8, 5],
    '5to8': [5, 8],
    '8to1': [8, 1],
    '1to8': [1, 8],
  };

  export const BITS_LENGTH: Record<BitDepth, number> = {
    1: 2,
    4: 16,
    5: 32,
    8: 256,
  };

  export function convertXbitTo8Bit(value: number, bitDepth: BitDepth): number {
    switch (bitDepth) {
      case 1:
        return value === 0 ? 0 : 255;
      case 4:
        return BitUtils.convert4bitTo8bit(value);
      case 5:
        return BitUtils.convert5bitTo8bit(value);
      case 8:
        return value;
    }
  }

  export function convertValue(value: number, mode: AppMode): number {
    switch (mode) {
      case "8to4": return BitUtils.convert8bitTo4bit(value);
      case "4to8": return BitUtils.convert4bitTo8bit(value);
      case "8to5": return BitUtils.convert8bitTo5bit(value);
      case "5to8": return BitUtils.convert5bitTo8bit(value);
      case "8to1": return value === 0 ? 0 : 1;
      case "1to8": return value === 0 ? 0 : 255;
    }
  }
}
