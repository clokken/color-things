import React from 'react';
import { Lib } from '../lib';
import { ValueMap } from '../types';
import ColorMap from './ColorMap';
import ColorMapWrapper from './ColorMapWrapper';

function App() {
  const [mode, setMode] = React.useState<'8to4' | '4to8'>('8to4');

  const [justifyWrappers, setJustifyWrappers] =
    React.useState<React.CSSProperties['justifyContent']>('start');

  const [reverseOrder, setReverseOrder] = React.useState(false);

  const count = mode === '8to4' ? 256 : 16;

  const srcValues = Array.from({ length: count }).map((_, idx) => (
    reverseOrder
      ? count - idx - 1
      : idx
  ));

  const valuesMap: ValueMap[] = srcValues.map((value) => {
    return {
      src: value,
      dst: mode === '8to4'
        ? Lib.convert8bitTo4bit(value)
        : Lib.convert4bitTo8bit(value),
    };
  });

  const headerLeft = mode === '8to4' ? '8-bit' : '4-bit';
  const headerRight = mode === '8to4' ? '4-bit' : '8-bit';

  const mainContent = (
    <div style={{
      display: 'flex',
      justifyContent: justifyWrappers,
      alignItems: 'start',
    }}>
      <ColorMapWrapper label="White (r+g+b)">
        <ColorMap
          valuesMap={valuesMap}
          headerLeft={headerLeft}
          headerRight={headerRight}
          mode={mode}
          red={true}
          green={true}
          blue={true}
        />
      </ColorMapWrapper>

      <ColorMapWrapper label="Red">
        <ColorMap
          valuesMap={valuesMap}
          headerLeft={headerLeft}
          headerRight={headerRight}
          mode={mode}
          red={true}
          green={false}
          blue={false}
        />
      </ColorMapWrapper>

      <ColorMapWrapper label="Green">
        <ColorMap
          valuesMap={valuesMap}
          headerLeft={headerLeft}
          headerRight={headerRight}
          mode={mode}
          red={false}
          green={true}
          blue={false}
        />
      </ColorMapWrapper>

      <ColorMapWrapper label="Blue">
        <ColorMap
          valuesMap={valuesMap}
          headerLeft={headerLeft}
          headerRight={headerRight}
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
      <div style={{
        display: 'flex',
        width: '100vw',
        height: 48,
        overflow: 'auto',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '10px 20px',
        boxSizing: 'border-box',
      }}>
        <select
          value={mode}
          onChange={(ev) => setMode(ev.target.value === '4to8' ? '4to8' : '8to4')}
          style={{ marginRight: 10 }}
        >
          <option value="8to4">8 bits range</option>
          <option value="4to8">4 bits range</option>
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

      {mainContent}
    </div>
  );
}

export default App;
