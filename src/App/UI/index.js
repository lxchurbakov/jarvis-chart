import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import LeftUI from './LeftUI';
import BottomUI from './BottomUI';

const UIWrap = styled.div`
  position: relative;
  &:hover {
    *[data-ui=bottom] {
      opacity: 1;
      pointer-events: auto;
      bottom: 20px;
    }
    *[data-ui=left] {
      opacity: 1;
      pointer-events: auto;
      left: 20px;
    }
  }
`;

/* Это временная обёртка для демонстрации */
setTimeout(() => console.todo('Удалить temporary UI'), 100);

export default ({
  children,
  onPaint, onEye, onVector, onLineCircle, onLineCircleHorizontal, onSegmentDiagonal,
  onSegmentHorizontal, onRectangle, onCircle, onTriangle, onText,
  onLeft, onRight, onZoomIn, onZoomOut, onGoldenRatio, onEraser,
  modal, onDone,
}) => (
  <UIWrap>
    {children}
    <BottomUI onDone={onDone} onLeft={onLeft} onRight={onRight} onZoomIn={onZoomIn} onZoomOut={onZoomOut} modal={modal} />
    <LeftUI
      onPaint={onPaint} onEye={onEye} onVector={onVector}
      onLineCircle={onLineCircle} onLineCircleHorizontal={onLineCircleHorizontal}
      onSegmentDiagonal={onSegmentDiagonal} onSegmentHorizontal={onSegmentHorizontal}
      onRectangle={onRectangle} onCircle={onCircle} onTriangle={onTriangle}
      onText={onText} onGoldenRatio={onGoldenRatio} onCircle={onCircle} onEraser={onEraser}
    />
  </UIWrap>
);
