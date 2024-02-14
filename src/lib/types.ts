export type ValueMap = {
  src: number;
  dst: number;
};

export type BitDepth = 4 | 5 | 8 | 1;

export const APP_MODES = [
  '8to4',
  '4to8',
  '8to5',
  '5to8',
  '8to1',
  '1to8',
] as const;

export type AppMode = typeof APP_MODES[number];
