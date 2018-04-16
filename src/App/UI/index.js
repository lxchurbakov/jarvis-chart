import React from 'react';
import styled from 'styled-components';

import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut, Calendar, Undo } from './icons';
import CircleButton from './CircleButton';

const UIWrap = styled.div`
  position: relative;
  &:hover {
    *[data-ui] {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const BottomUIWrap = styled.div.attrs({ 'data-ui': true })`
  pointer-events: none;
  opacity: 0;

  transition: all 200ms ease;

  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  /* box-shadow: 0px 0px 34px 10px rgba(255,255,255,1); */
  & > * {
    margin: 5px;
  }
`;

const BottomUI = () => (
  <BottomUIWrap>
    <CircleButton>
      <ArrowLeft width={25} height={20} />
    </CircleButton>
    <CircleButton>
      <ZoomIn width={25} height={20} />
    </CircleButton>
    <CircleButton>
      <Undo width={25} height={20} />
    </CircleButton>
    <CircleButton>
      <ZoomOut width={25} height={20} />
    </CircleButton>
    <CircleButton>
      <ArrowRight width={25} height={20} />
    </CircleButton>
  </BottomUIWrap>
);

export default ({ children }) => (
  <UIWrap>
    {children}
    <BottomUI />
  </UIWrap>
);
