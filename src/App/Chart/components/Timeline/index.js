import React from 'react';

import Matrix from '../../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import { Text } from '../../elements';

const Timeline = ({ data, nth = 1 }) => {
  return (
    data.map(({ min, max, open, close }, index) => (
      index % nth === 0
        ? (
          <MatrixTransformer key={index} transform={Matrix.transformLeft(Matrix.translate(index * 10 + 3.5, 5))}>
            <MatrixTransformer transform={matrix => Matrix.multiply(Matrix.resetScale(matrix), matrix)}>
              <Text font="13px Arial" text="test" />
            </MatrixTransformer>
          </MatrixTransformer>
        ) : null      
    ))
  );
};

export default Timeline;
