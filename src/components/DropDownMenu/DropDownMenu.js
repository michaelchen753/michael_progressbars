import React from 'react';
import './DropDownMenu.scss';

const DropDownMenu = ({
  progressBarListData,
  onProgressBarSelectedChange,
}) => (
  <div className='dropdownmenu'>
        <label>
            <select
                data-testid='progressBarSelect'
                onChange={(event) => onProgressBarSelectedChange(event.target.value)}
            >
                <option value=''>Choose a bar to start</option>                    
                {progressBarListData?.map(item=> (
                    <option
                        value={item.id}
                        key={item.id}
                        selected={item.selected}
                        data-testid={`select_${item.id}`}
                    >
                        {`#progress${item.id}`}
                    </option>
                ))}                        
            </select>
        </label>
    </div>
);

export default React.memo(DropDownMenu);
