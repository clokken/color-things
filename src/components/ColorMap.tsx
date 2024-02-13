import { ValueMap } from "../types";
import ArrowCell from "./ArrowCell";
import ColorCell from "./ColorCell";

type ColorMapProps = {
  valuesMap: ValueMap[];
  headerLeft: string;
  headerRight: string;
  mode: '8to4' | '4to8';
  red: boolean;
  green: boolean;
  blue: boolean;
};

export default function ColorMap({
  valuesMap,
  headerLeft,
  headerRight,
  mode,
  red,
  green,
  blue,
}: ColorMapProps) {
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
              <ColorCell value={src} bits={mode === '8to4' ? 8 : 4}
                red={red} green={green} blue={blue} />
            </div>
            <div style={arrowStyle}>
              <ArrowCell />
            </div>
            <div className={colCls} style={colStyle}>
              <ColorCell value={dst} bits={mode === '8to4' ? 4 : 8}
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
