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
  background: white;
`;

const IndicatorOptionSpan = styled.span`
  margin-right: 10px;
  cursor: pointer;
  color: ${props => props.active ? '#FA2C50' : 'inherit'};
  user-select: none;
`;

const IndicatorOption = ({ text, active, onClick }) => (
  <IndicatorOptionSpan active={active} onClick={onClick}>{ text }</IndicatorOptionSpan>
);

const Done = ({ onClick   }) => (
  <div onClick={onClick} style={{ color: '#FA2C50', marginTop: 200, cursor: 'pointer' }}>Done</div>
);

const indicators = [
  'bollinger', 'cci', 'rsi', 'stochastic', 'darvas-box', 'moving-average', 'highest-high',
  'lowest-low', 'macd', 'parabolic-sar',
  // 'volume', 'volume-profile',
]

class Indicators extends React.Component {
  constructor () {
    super();

    this.state = { visible: false, indicators: [], graph: 'candles' };
  }

  toggle = () => {
    const { visible } = this.state;

    if (visible)
      this.props.onDone({ indicators: this.state.indicators, graph: this.state.graph });

    this.setState((state) => ({ ...state, visible: !state.visible }));
  }

  toggleIndicator = (i) => {
    this.setState((state) => {
      const { indicators } = state;

      const index = indicators.indexOf(i);

      if (index > -1)
        return {
          ...state,
          indicators: indicators.filter(_i => i !== _i)
        };
      else
        return {
          ...state,
          indicators: indicators.concat([ i ])
        }

    });
  }

  test = (e) => {
    // console.log(e.target.value)
    this.setState((state) => ({ ...state, graph: this.a.value }));
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
                <SelectStyled onInput={this.test} innerRef={a => this.a = a}>
                  <option>candles</option>
                  <option>lines</option>
                  <option>bars</option>
                </SelectStyled>
              </div>
              <div>
                <p>Click on indicators you want to see</p>
                {indicators.map(i => {
                  const active = this.state.indicators.indexOf(i) !== -1;

                  return (<IndicatorOption key={i} text={i} active={active} onClick={() => this.toggleIndicator(i)}/>)
                })}
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
      onText={onText}
    />
  </UIWrap>
);
