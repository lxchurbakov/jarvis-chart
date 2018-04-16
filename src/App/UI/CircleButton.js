import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  border-radius: 30px;
	border: 1px solid #E2E2F1;
  padding: 15px;
  width: 25px;
  height: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease, box-shadow 70ms ease;
  background: white;
  &:hover {
    border-color: #15E6C1;
  }
  &:active {
    box-shadow: 0px 0px 10px 2px #15E6C1;
  }
`;

export default ({ children }) => (
  <Wrap>
    {children}
  </Wrap>
);
