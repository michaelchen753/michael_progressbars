import React from 'react';
import './Button.scss';

const Buttons = ({
  data,
  onMaintainButtonClick,
}) => (
  <div className='buttons'>
        {data?.map((maintainValue, index) => (                    
            <button 
                data-testid={`maintain_button_${index}`}
                key={index}
                onClick={() => onMaintainButtonClick(maintainValue)}
            >{ maintainValue>0 ? `+${maintainValue}`: `${maintainValue}`}</button>
        ))}            
    </div>
);

export default React.memo(Buttons);
