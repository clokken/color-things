import React from 'react';
import { APP_MODES, AppMode, ValueMap } from '../lib/types';
import { Utils } from '../lib/utils';
import ColorMap from './ColorMap';
import ColorMapWrapper from './ColorMapWrapper';

function App() {
  const [mode, setMode] = React.useState<AppMode>('8to4');

  const [justifyWrappers, setJustifyWrappers] =
    React.useState<React.CSSProperties['justifyContent']>('start');

  const [reverseOrder, setReverseOrder] = React.useState(false);

  const [bitsLeft] = Utils.APP_MODE_BITS[mode];
  const count = Utils.BITS_LENGTH[bitsLeft];

  const srcValues = Array.from({ length: count }).map((_, idx) => (
    reverseOrder
      ? count - idx - 1
      : idx
  ));

  const valuesMap: ValueMap[] = srcValues.map((value) => {
    return {
      src: value,
      dst: Utils.convertValue(value, mode),
    };
  });

  let notes: string | undefined = undefined;

  if (mode === '8to1') {
    notes = `Note: The way I'm converting from 8-bits to 1-bit here is by simply checking if the`
      + ` source value is 0 or not. If it's 0 it remains 0 (transparent), otherwise, if it's any`
      + ` value greater than 0 then it becomes 1 (opaque).`
      + `\nAnother way I could have done it (and which the new GAF Builder could implement) is by`
      + ` dividing the source value by two and if it's <= 127 then it becomes 0, otherwise, if it's`
      + ` > 127 then it becomes 1.`;
  }

  const mainContent = (
    <div
      className="flex items-start"
      style={{
        justifyContent: justifyWrappers,
      }}
    >
      <ColorMapWrapper label="White (r+g+b)">
        <ColorMap
          valuesMap={valuesMap}
          mode={mode}
          red={true}
          green={true}
          blue={true}
        />
      </ColorMapWrapper>

      <ColorMapWrapper label="Red">
        <ColorMap
          valuesMap={valuesMap}
          mode={mode}
          red={true}
          green={false}
          blue={false}
        />
      </ColorMapWrapper>

      <ColorMapWrapper label="Green">
        <ColorMap
          valuesMap={valuesMap}
          mode={mode}
          red={false}
          green={true}
          blue={false}
        />
      </ColorMapWrapper>

      <ColorMapWrapper label="Blue">
        <ColorMap
          valuesMap={valuesMap}
          mode={mode}
          red={false}
          green={false}
          blue={true}
        />
      </ColorMapWrapper>
    </div>
  );

  return (
    <div>
      <div
        className="flex justify-start tems-center overflow-auto box-border px-4 py-2"
        style={{
          width: '100vw',
        }}
      >
        <select
          value={mode}
          onChange={(ev) => setMode(ev.target.value as AppMode)}
          style={{ marginRight: 10 }}
        >
          {APP_MODES.map((appMode) => {
            const [bitsLeft, bitsRight] = Utils.APP_MODE_BITS[appMode];
            return (
              <option
                key={appMode}
                value={appMode}
              >
                {`${bitsLeft} bits -> ${bitsRight} bits`}
              </option>
            );
          })}
        </select>

        <select
          value={reverseOrder ? 'desc' : 'asc'}
          onChange={(ev) => setReverseOrder(ev.target.value === 'desc' ? true : false)}
          style={{ marginRight: 10 }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select
          value={justifyWrappers}
          onChange={(ev) => setJustifyWrappers(ev.target.value)}
          // style={{ marginRight: 10 }}
        >
          <option value={'start' satisfies typeof justifyWrappers}>Justify start</option>
          <option value={'center' satisfies typeof justifyWrappers}>Justify center</option>
          <option value={'space-between' satisfies typeof justifyWrappers}>Justify between</option>
        </select>
      </div>

      {notes !== undefined && (
        <div className="m-4">
          <div className="inline-block border border-dashed border-gray-500 rounded px-2 py-1">
            <span className="whitespace-pre-line text-gray-300">{notes}</span>
          </div>
        </div>
      )}

      {mainContent}
    </div>
  );
}

export default App;
