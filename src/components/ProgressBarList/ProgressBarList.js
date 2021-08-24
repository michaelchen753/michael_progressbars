import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './ProgressBarList.scss';
const ProgressBarList = ({
  data
}) => {
  return (
    <div className='barlist'>
            {data?.map((item, index) => (
                <ul key={`${item.completed}_${index}`}>
                    <li key={ index }><ProgressBar item={ item } /></li>
                </ul>
              ))
            }
        </div>
  );
};

export default React.memo(ProgressBarList);
