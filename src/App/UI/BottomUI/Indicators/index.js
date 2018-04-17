import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, CalendarIcon, UndoIcon, GraphIcon,
  FileIcon, EyeIcon, PadlockIcon, PaintIcon, VectorIcon, LineCircleIcon, LineCircleHorizontalIcon, SegmentDiagonalIcon, SegmentHorizontalIcon,
  RectangleIcon, CircleIcon, TriangleIcon, GoldenRatioIcon, EraserIcon, PencilIcon, TextIcon, RedoIcon
} from '../../components/icons';

import CircleButton from '../../components/CircleButton';

const indicators = [
  'bollinger', 'cci', 'rsi', 'stochastic', 'darvas-box', 'moving-average', 'highest-high',
  'lowest-low', 'macd', 'parabolic-sar',
  // 'volume', 'volume-profile',
];

const Done = ({ onClick   }) => (
  <div onClick={onClick} style={{ color: '#FA2C50', marginTop: 200, cursor: 'pointer' }}>Done</div>
);

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

export default Indicators;
