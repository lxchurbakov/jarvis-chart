import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, CalendarIcon, UndoIcon, GraphIcon,
  FileIcon, EyeIcon, PadlockIcon, PaintIcon, VectorIcon, LineCircleIcon, LineCircleHorizontalIcon, SegmentDiagonalIcon, SegmentHorizontalIcon,
  RectangleIcon, CircleIcon, TriangleIcon, GoldenRatioIcon, EraserIcon, PencilIcon, TextIcon, RedoIcon
} from '../components/icons';
import CircleButton from '../components/CircleButton';

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
  onGoldenRatio,
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
    <div onClick={onGoldenRatio}><GoldenRatioIcon width={25} height={25} /></div>
    {/* <div onClick={onFile}><EraserIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><PencilIcon width={25} height={25} /></div> */}
    {/*<div onClick={onText}><TextIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><UndoIcon width={25} height={25} /></div> */}
    {/* <div onClick={onFile}><RedoIcon width={25} height={25} /></div> */}
  </LeftUIWrap>
);

export default LeftUI;
