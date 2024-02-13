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
      <div style={row}>
        <div style={col}>
          {headerLeft}
        </div>
        <div style={arrowCol}></div>
        <div style={col}>
          {headerRight}
        </div>
      </div>
      {valuesMap.map(({ src, dst }, index) => {
        return (
          <div
            key={index}
            style={row}
          >
            <div style={col}>
              <ColorCell value={src} bits={mode === '8to4' ? 8 : 4}
                red={red} green={green} blue={blue} />
            </div>
            <div style={arrowCol}>
              <ArrowCell />
            </div>
            <div style={col}>
              <ColorCell value={dst} bits={mode === '8to4' ? 4 : 8}
                red={red} green={green} blue={blue} reverse />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'stretch',
  // marginBottom: 1,
};

const col: React.CSSProperties = {
  // padding: '12px 6px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 14,
  width: 100,
  height: 30,
};

const arrowCol: React.CSSProperties = {
  ...col,
  width: 40,
};
