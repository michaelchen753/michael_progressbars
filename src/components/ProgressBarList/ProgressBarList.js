import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './ProgressBarList.scss';
const ProgressBarList = ({
  data
}) => {
  return (
    <div className='barlist'>
            {data?.map((item, index) => (
                <li key={index}><ProgressBar props={item} /></li>
              ))
            }
        </div>
  );
};

export default React.memo(ProgressBarList);
