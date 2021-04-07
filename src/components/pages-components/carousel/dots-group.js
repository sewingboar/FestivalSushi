import React from 'react';
import { DotComponent } from './dot';

export const DotsGroup = () => {
  return(
    <React.Fragment>
      <DotComponent slideNumber={0} styles={firstPosition} />
      <DotComponent slideNumber={1} styles={secondPosition} />
    </React.Fragment>
  )
}

const firstPosition = {
  right: '24px',
  top: '45%',
};

const secondPosition = {
  right: '24px',
  top: '50%'
};
