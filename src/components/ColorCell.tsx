import { Lib } from "../lib";

type ColorCellProps = {
  value: number;
  bits: 4 | 8;
  red: boolean;
  green: boolean;
  blue: boolean;
  reverse?: boolean;
};

export default function ColorCell({
  value,
  bits,
  red,
  green,
  blue,
  reverse,
}: ColorCellProps) {
  const color = bits === 4 ? Lib.convert4bitTo8bit(value) : value;
  const r = red   ? 1 : 0;
  const g = green ? 1 : 0;
  const b = blue  ? 1 : 0;
  const background = `rgba(${color * r}, ${color * g}, ${color * b}, 1)`;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      justifyContent: reverse ? 'start' : 'end',
      alignItems: 'center',
    }}>
      <span style={{
        fontFamily: 'monospace',
      }}>
        {value}
      </span>

      <div style={{ width: 10 }} />

      <div style={{
        width: 30,
        height: '100%',
        background,
      }} />
    </div>
  );
}
