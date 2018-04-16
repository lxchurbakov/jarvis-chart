import React from 'react';
import styled from 'styled-components';

import { ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, CalendarIcon, UndoIcon } from './icons';
import CircleButton from './CircleButton';

const UIWrap = styled.div`
  position: relative;
  &:hover {
    *[data-ui=bottom] {
      opacity: 1;
      pointer-events: auto;
      bottom: 20px;
    }
  }
`;

const BottomUIWrap = styled.div.attrs({ 'data-ui': 'bottom' })`
  pointer-events: none;
  opacity: 0;
  transition: all 200ms ease;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  & > * {
    margin: 5px;
  }
`;

const BottomUI = ({ onLeft, onRight, onZoomIn, onZoomOut }) => (
  <BottomUIWrap>
    <CircleButton onClick={onLeft}>
      <ArrowLeftIcon width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onZoomIn}>
      <ZoomInIcon width={25} height={20} />
    </CircleButton>
    <CircleButton>
      <UndoIcon width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onZoomOut}>
      <ZoomOutIcon width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onRight}>
      <ArrowRightIcon width={25} height={20} />
    </CircleButton>
  </BottomUIWrap>
);

export default ({ children, onLeft, onRight, onZoomIn, onZoomOut }) => (
  <UIWrap>
    {children}
    <BottomUI onLeft={onLeft} onRight={onRight} onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
  </UIWrap>
);
