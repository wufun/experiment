import React from 'react'
import {Icon} from 'antd'
import './IconWall.css'

function IconWall (props) {
  const {iconsPerRow, icons} = props;
  const size = window.innerWidth / iconsPerRow
  const style = {
    width: size,
    fontSize: 'calc(3vw + 3vh)',
    padding: '10px'
  };

  return (
    <div className="IconWall">
      {icons.map((icon, index) => {
        if (icon.hidden) {
          return <span key={index} style={style} />
        } else {
          return <Icon key3={index}
                       type={icon.type}
                       theme={icon.theme}
                       style={style}/>
        }
      })}
    </div>
  )
}

export default IconWall
