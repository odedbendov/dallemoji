import React, { useState } from 'react';

export default function HoverSpan(props) {

  const {style, hoverStyle, children, ...restOfProps} = props;

  const [hover, setHover] = useState(false);

  return (
    <span style={{...style, ...(hover ? hoverStyle : {})}}
      onMouseEnter={() => {
        !hover && setHover(true)
      }}
      onMouseLeave={() => hover && setHover(false)}
      {...restOfProps}
      >
      {children}
    </span>
  )
}

