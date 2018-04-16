import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, CalendarIcon, UndoIcon, GraphIcon,
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

const Modal = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  position: fixed;
  z-index: 100;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
`;

const ModalContent = styled.div`
  width : 600px;
  margin: 200px auto;
`;

const SelectStyled = styled.select`
  padding: 10px 16px;
  background: none;
  min-width: 200px;
`;

const IndicatorOptionSpan = styled.span`
  margin-right: 10px;
  cursor: pointer;
`;

const IndicatorOption = ({ text, active }) => (
  <IndicatorOptionSpan>{ text }</IndicatorOptionSpan>
);

const Done = ({ onClick   }) => (
  <div onClick={onClick} style={{ color: '#FA2C50', marginTop: 200, cursor: 'pointer' }}>Done</div>
);

class Indicators extends React.Component {
  constructor () {
    super();

    this.state = { visible: false };
  }

  toggle = () => {
    this.setState((state) => ({ ...state, visible: !state.visible }));
  }

  render () {
    const { visible } = this.state;
    const { modal } = this.props;

    return (
      <div>
        <CircleButton onClick={this.toggle}>
          <GraphIcon width={40} height={20} />
        </CircleButton>
        {ReactDOM.createPortal((
          <Modal visible={visible}>
            <ModalContent>
              <h1>Graph Config</h1>
              <div>
                <p>Choose Graph render style</p>
                <SelectStyled>
                  <option>Candles</option>
                  <option>Line</option>
                  <option>Bars</option>
                </SelectStyled>
              </div>
              <div>
                <p>Click on indicators you want to see</p>
                <IndicatorOption text="Bollinger" active={false} />
                <IndicatorOption text="CCI" active={false} />
                <IndicatorOption text="RSI" active={false} />
                <IndicatorOption text="Stochastic" active={false} />
                <IndicatorOption text="Darvas Box" active={false} />
                <IndicatorOption text="Moving Average" active={false} />
                <IndicatorOption text="Highest High" active={false} /> <br />
                <IndicatorOption text="Lowest Low" active={false} />

                <IndicatorOption text="Volume" active={false} />
                <IndicatorOption text="Parabolic SAR" active={false} />
                <IndicatorOption text="Volume Profile" active={false} />
                <IndicatorOption text="MACD" active={false} />
              </div>
              <div>
                <Done onClick={this.toggle}/>
              </div>
            </ModalContent>
          </Modal>
        ), modal)}
      </div>
    );
  }
};

const BottomUI = ({ onLeft, onRight, onZoomIn, onZoomOut, modal }) => (
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
    <Indicators modal={modal} />
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
  modal,
}) => (
  <UIWrap>
    {children}
    <BottomUI onLeft={onLeft} onRight={onRight} onZoomIn={onZoomIn} onZoomOut={onZoomOut} modal={modal} />
    <LeftUI
      onPaint={onPaint} onEye={onEye} onVector={onVector}
      onLineCircle={onLineCircle} onLineCircleHorizontal={onLineCircleHorizontal}
      onSegmentDiagonal={onSegmentDiagonal} onSegmentHorizontal={onSegmentHorizontal}
      onRectangle={onRectangle} onCircle={onCircle} onTriangle={onTriangle}
      onText={onText}
    />
  </UIWrap>
);
