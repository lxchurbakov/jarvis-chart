import React from 'react';
import styled from 'styled-components';

import {
  ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, CalendarIcon, UndoIcon,
  FileIcon, EyeIcon, PadlockIcon, PaintIcon, VectorIcon, LineCircleIcon, LineCircleHorizontalIcon, SegmentDiagonalIcon, SegmentHorizontalIcon,
  RectangleIcon, CircleIcon, TriangleIcon, GoldenRatioIcon, EraserIcon, PencilIcon, TextIcon, RedoIcon
} from './icons';
import CircleButton from './CircleButton';

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

const BottomUI = ({ onLeft, onRight, onZoomIn, onZoomOut }) => (
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
    <CircleButton onClick={onZoomOut}>
      <ZoomOutIcon width={25} height={20} />
    </CircleButton>
    <CircleButton onClick={onRight}>
      <ArrowRightIcon width={25} height={20} />
    </CircleButton>
  </BottomUIWrap>
);

const LeftUIWrap = styled.div.attrs({ 'data-ui': 'left' })`
  pointer-events: none;
  opacity: 0;
  transition: all 200ms ease;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  & > * {
    margin: 5px;
    cursor: pointer;
    transition: transform 200ms ease;
    &:hover {
      transform: scale(1.2);
      transform-origin: 50% 50%;
    }
  }
`;

const LeftUI = ({
  onEye, onPaint,
  onVector, onLineCircle, onLineCircleHorizontal, onSegmentDiagonal,
  onSegmentHorizontal, onRectangle, onCircle, onTriangle, onText,
}) => (
  <LeftUIWrap>
    {/* <div><FileIcon width={25} height={25} /></div> */}
    <div onClick={onEye}><EyeIcon width={25} height={25} /></div>
    {/* <div><PadlockIcon width={25} height={25} /></div> */}
    <div onClick={onPaint}><PaintIcon width={25} height={25} /></div>
    {/* <div onClick={onVector}><VectorIcon width={25} height={25} /></div> */}
    <div onClick={onLineCircle}><LineCircleIcon width={25} height={25} /></div>
    <div onClick={onLineCircleHorizontal}><LineCircleHorizontalIcon width={25} height={25} /></div>
    <div onClick={onSegmentDiagonal}><SegmentDiagonalIcon width={25} height={25} /></div>
    <div onClick={onSegmentHorizontal}><SegmentHorizontalIcon width={25} height={25} /></div>
    <div onClick={onRectangle}><RectangleIcon width={25} height={25} /></div>
    {/*<div onClick={onCircle}><CircleIcon width={25} height={25} /></div> */}
    {/*<div onClick={onTriangle}><TriangleIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><GoldenRatioIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><EraserIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><PencilIcon width={25} height={25} /></div> */}
    {/*<div onClick={onText}><TextIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><UndoIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><RedoIcon width={25} height={25} /></div> */}
  </LeftUIWrap>
);

export default ({
  children,
  onPaint, onEye, onVector, onLineCircle, onLineCircleHorizontal, onSegmentDiagonal,
  onSegmentHorizontal, onRectangle, onCircle, onTriangle, onText,
  onLeft, onRight, onZoomIn, onZoomOut,
}) => (
  <UIWrap>
    {children}
    <BottomUI onLeft={onLeft} onRight={onRight} onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
    <LeftUI
      onPaint={onPaint} onEye={onEye} onVector={onVector}
      onLineCircle={onLineCircle} onLineCircleHorizontal={onLineCircleHorizontal}
      onSegmentDiagonal={onSegmentDiagonal} onSegmentHorizontal={onSegmentHorizontal}
      onRectangle={onRectangle} onCircle={onCircle} onTriangle={onTriangle}
      onText={onText}
    />
  </UIWrap>
);
