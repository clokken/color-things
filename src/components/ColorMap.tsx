import { AppMode, ValueMap } from "../lib/types";
import { Utils } from "../lib/utils";
import ArrowCell from "./ArrowCell";
import ColorCell from "./ColorCell";

type ColorMapProps = {
  valuesMap: ValueMap[];
  mode: AppMode;
  red: boolean;
  green: boolean;
  blue: boolean;
};

export default function ColorMap({
  valuesMap,
  mode,
  red,
  green,
  blue,
}: ColorMapProps) {
  const [bitsLeft, bitsRight] = Utils.APP_MODE_BITS[mode];
  const headerLeft = bitsLeft + '-bit';
  const headerRight = bitsRight + '-bit';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <div className={rowCls}>
        <div className={colCls} style={colStyle}>
          {headerLeft}
        </div>
        <div style={arrowStyle}></div>
        <div className={colCls} style={colStyle}>
          {headerRight}
        </div>
      </div>
      {valuesMap.map(({ src, dst }, index) => {
        return (
          <div
            key={index}
            className={rowCls}
          >
            <div className={colCls} style={colStyle}>
              <ColorCell value={src} bits={bitsLeft}
                red={red} green={green} blue={blue} />
            </div>
            <div style={arrowStyle}>
              <ArrowCell />
            </div>
            <div className={colCls} style={colStyle}>
              <ColorCell value={dst} bits={bitsRight}
                red={red} green={green} blue={blue} reverse />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const rowCls = 'flex items-stretch';

const colCls = 'flex justify-center items-center text-base';
const colStyle: React.CSSProperties = {
  width: 100,
  height: 30,
};

const arrowStyle: React.CSSProperties = {
  ...colStyle,
  width: 40,
};
