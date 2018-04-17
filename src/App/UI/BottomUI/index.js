
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, CalendarIcon, UndoIcon, GraphIcon,
  FileIcon, EyeIcon, PadlockIcon, PaintIcon, VectorIcon, LineCircleIcon, LineCircleHorizontalIcon, SegmentDiagonalIcon, SegmentHorizontalIcon,
  RectangleIcon, CircleIcon, TriangleIcon, GoldenRatioIcon, EraserIcon, PencilIcon, TextIcon, RedoIcon
} from '../components/icons';
import CircleButton from '../components/CircleButton';

import Indicators from './Indicators';

const BottomUIWrap = styled.div.attrs({ 'data-ui': 'bottom' })`
  pointer-events: none;
  opacity: 0;
  transition: all 200ms ease;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  & > * {
    margin: 5px;
  }
`;

const BottomUI = ({ onLeft, onRight, onZoomIn, onZoomOut, modal, onDone }) => (
  <BottomUIWrap>
    <CircleButton onClick={onLeft}>
      <ArrowLeftIcon width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onZoomIn}>
      <ZoomInIcon width={25} height={20} />
    </CircleButton>
    {/* <CircleButton>
      <UndoIcon width={25} height={20} />
    </CircleButton> */}
    <Indicators modal={modal} onDone={onDone}/>
    <CircleButton onClick={onZoomOut}>
      <ZoomOutIcon width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onRight}>
      <ArrowRightIcon width={25} height={20} />
    </CircleButton>
  </BottomUIWrap>
);

export default BottomUI;
