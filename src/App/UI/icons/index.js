import React from 'react';

import arrowLeft from './arrow-left.svg';
import arrowRight from './arrow-right.svg';
import zoomIn from './zoom-in.svg';
import zoomOut from './zoom-out.svg';
import calendar from './calendar.svg';
import undo from './undo.svg';

export const ArrowLeft = ({ width, height }) => (
  <img style={{ width, height, 'userSelect': 'none' }} src={arrowLeft} />
);

export const ArrowRight = ({ width, height }) => (
  <img style={{ width, height, 'userSelect': 'none' }} src={arrowRight} />
);

export const ZoomIn = ({ width, height }) => (
  <img style={{ width, height, 'userSelect': 'none' }} src={zoomIn} />
);

export const ZoomOut = ({ width, height }) => (
  <img style={{ width, height, 'userSelect': 'none' }} src={zoomOut} />
);

export const Calendar = ({ width, height }) => (
  <img style={{ width, height , 'userSelect': 'none'}} src={calendar} />
);

export const Undo = ({ width, height }) => (
  <img style={{ width, height, 'userSelect': 'none' }} src={undo} />
);
