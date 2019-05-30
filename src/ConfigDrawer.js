import React from 'react'
import {range, round, zipObject} from 'lodash'
import {Drawer, Checkbox, Form, Slider} from 'antd'
import './ConfigDrawer.css'

function ConfigDrawer(props) {
  const onChangeConfig = (changes) => {
    props.onChange({...props.config, ...changes})
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <div className="ConfigDrawer">
      <Drawer title="Preference" placement="top" visible={props.visible} onClose={props.onClose} height={370}>
        <Form {...formItemLayout}>
          <Form.Item label="Icon themes">
            <Checkbox.Group options={props.config.themes}
                            defaultValue={props.config.selectedThemes}
                            onChange={(selectedThemes) => onChangeConfig({selectedThemes})} />
          </Form.Item>

          <Form.Item label="Icons per row">
            <Slider min={1}
                    max={24}
                    marks={zipObject(range(1, 25), range(1, 25))}
                    value={props.config.iconsPerRow}
                    onChange={(iconsPerRow) => onChangeConfig({iconsPerRow})} >
            </Slider>
          </Form.Item>

          <Form.Item label="Icons emptiness">
            <Slider min={0}
                    max={1}
                    step={0.1}
                    marks={zipObject(range(0, 1.1, 0.1), range(0, 1.1, 0.1).map((v) => round(v, 1)))}
                    value={props.config.emptiness}
                    tipFormatter={(value) => `${round(100*value)}%`}
                    onChange={(emptiness) => onChangeConfig({emptiness})} >
            </Slider>
          </Form.Item>

          <Form.Item label="Number of random icons">
            <Slider min={0}
                    max={1000}
                    step={100}
                    marks={zipObject(range(0, 1100, 100), range(0, 1100, 100))}
                    value={props.config.count}
                    onChange={(count) => onChangeConfig({count})} >
            </Slider>
          </Form.Item>
        </Form>

      </Drawer>
    </div>
  )
}

export default ConfigDrawer
