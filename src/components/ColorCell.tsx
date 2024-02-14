import { BitDepth } from "../lib/types";
import { Utils } from "../lib/utils";

type ColorCellProps = {
  value: number;
  bits: BitDepth;
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
  const color = Utils.convertXbitTo8Bit(value, bits);

  const r = red   ? 1 : 0;
  const g = green ? 1 : 0;
  const b = blue  ? 1 : 0;
  const background = `rgba(${color * r}, ${color * g}, ${color * b}, 1)`;

  return (
    <div
      className="w-full h-full flex items-center"
      style={{
        flexDirection: reverse ? 'row-reverse' : 'row',
        justifyContent: reverse ? 'start' : 'end',
      }}
    >
      <span className="font-mono">
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
