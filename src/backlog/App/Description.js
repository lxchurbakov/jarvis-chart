import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 1000px;
  margin: 30px auto;
`;

const Description = () => {
  return (
    <Wrap>
      <h1>Jarvis Chart Demo</h1>
      <div>
        Перед Вами демонстрационаня версия графика для Jarvis
      </div>
    </Wrap>
  )
};

export default Description;
