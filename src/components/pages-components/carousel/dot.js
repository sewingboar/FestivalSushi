import React from 'react';
import { Dot } from 'pure-react-carousel';

export const DotComponent = ({ slideNumber, styles }) => {
  return(
    <Dot slide={slideNumber} style={{..._styles, ...styles}} />
  )
}

const _styles = {
  position: 'absolute',
  padding: '0',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.5)'
};
