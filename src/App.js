import React, {useState} from 'react';
import {Button} from 'antd'
import {sampleSize, concat, reduce, get, keys, range} from 'lodash'
import IconWall from './IconWall'
import ConfigDrawer from './ConfigDrawer'
import 'antd/dist/antd.css'
import './App.css'


import outlinedIcons from './outlined-icons.value'
import filledIcons from './filled-icons.value'
import twoToneIcons from './two-tone-icons.value'

const OUTLINED_ICONS = outlinedIcons.map(icon => (
  {type: icon, theme: 'outlined'}
));

const FILLED_ICONS = filledIcons.map(icon => (
  {type: icon, theme: 'filled'}
));

const TWO_TONE_ICONS = twoToneIcons.map(icon => (
  {type: icon, theme: 'twoTone'}
));

const iconStore = {
  outlined: OUTLINED_ICONS,
  filled: FILLED_ICONS,
  twoTone: TWO_TONE_ICONS
};

const pickIcons = ({selectedThemes, count, emptiness}) => {
  const icons = sampleSize(reduce(selectedThemes, (r, v) =>
    concat(r, get(iconStore, v, []))
  , []), count);

  let emptyIconIndexes = sampleSize(range(count), count * emptiness);
  return icons.map((icon, index) => {
    if (emptyIconIndexes.includes(index)) {
      return {...icon, hidden: true}
    } else {
      return icon
    }
  })
};


function App() {
  const [configVisible, setConfigVisible] = useState(false);
  const [config, setConfig] = useState({
    themes: keys(iconStore),
    selectedThemes: ['outlined'],
    iconsPerRow: 15,
    emptiness: 0,
    count: 200
  });

  const onConfigChange = (config) => {
    setConfig(config)
  };

  const showConfig = () => {
    setConfigVisible(true)
  };

  return (
    <div className="App">
      <ConfigDrawer visible={configVisible} onClose={() => setConfigVisible(false)}
                    config={config} onChange={onConfigChange} />

      <Button className="ConfigButton" shape="circle" icon="setting" type="dashed" hidden={configVisible} onClick={showConfig} />
      <IconWall iconsPerRow={config.iconsPerRow}
                icons={pickIcons(config)}/>
    </div>
  );
}

export default App;
