import React from 'react';

import styled from 'styled-components';

const UIWrap = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const Button = styled.div`
  border-radius: 8px;
  padding: 7px 18px;
  font: 300 13px 'Open Sans';
  background: linear-gradient(to right, #c8348a 0%,#7437e8 100%);
  color: white;
  cursor: pointer;
`;

const ButtonsWrap = styled.div`
  display: flex;
  & > * {
    margin-right: 10px
  }
`;

const UI = () => (
  <UIWrap>
    <div>
      <h3>Действия для оси X</h3>
      <ButtonsWrap>
        <Button>Move Left</Button>
        <Button>Zoom In</Button>
        <Button>Zoom Out</Button>
        <Button>Move Right</Button>
      </ButtonsWrap>
    </div>

    <div>
      <h3>Действия для оси Y</h3>
      <p></p>
      <ButtonsWrap>
        <Button>Move Top</Button>
        <Button>Zoom In</Button>
        <Button>Zoom Out</Button>
        <Button>Move Bottom</Button>
      </ButtonsWrap>
      <p></p>
      <div>
        <input type="checkbox" /> Автоматический вертикальный зум
      </div>
    </div>
  </UIWrap>
);

export default UI;
