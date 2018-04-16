import React from 'react';
import styled from 'styled-components';

import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut, Calendar, Undo } from './icons';
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
  /* box-shadow: 0px 0px 34px 10px rgba(255,255,255,1); */
  & > * {
    margin: 5px;
  }
`;

const BottomUI = ({ onLeft, onRight, onZoomIn, onZoomOut }) => (
  <BottomUIWrap>
    <CircleButton onClick={onLeft}>
      <ArrowLeft width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onZoomIn}>
      <ZoomIn width={25} height={20} />
    </CircleButton>
    <CircleButton>
      <Undo width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onZoomOut}>
      <ZoomOut width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onRight}>
      <ArrowRight width={25} height={20} />
    </CircleButton>
  </BottomUIWrap>
);

export default ({ children, onLeft, onRight, onZoomIn, onZoomOut }) => (
  <UIWrap>
    {children}
    <BottomUI onLeft={onLeft} onRight={onRight} onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
  </UIWrap>
);
