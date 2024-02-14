export module BitUtils {
  export function convert8bitTo4bit(component: number): number {
    return Math.round((component * 15) / 255);
  }

  export function convert4bitTo8bit(component: number): number {
    return Math.round((component * 255) / 15);
  }

  export function convert8bitTo5bit(component: number): number {
    return Math.round((component * 31) / 255);
  }

  export function convert5bitTo8bit(component: number): number {
    return Math.round((component * 255) / 31);
  }
}
