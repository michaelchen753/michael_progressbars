import React, {
  useEffect,
  useState
} from 'react';
import ProgressBarList from '../components/ProgressBarList/ProgressBarList';
import DropDownMenu from '../components/DropDownMenu/DropDownMenu';
import Buttons from '../components/Buttons/Buttons';
import axios from 'axios';

import './ProgressBarWidget.scss';


const ProgressBarWidget = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressBarListData, setProgressBarListData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://pb-api.herokuapp.com/bars');
        
        if(response.data) {
          setData(response.data);
          
          setProgressBarListData(response.data?.bars?.map((item, index) => ({
            id: index + 1,
            selected: index === 0 ? true : false,
            completed: item,
          })));
        } else {
          setError("Response data is null.");
        }
        setLoading(false);
      } catch (err) {
        setError(err?.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  
  const handleProgressBarSelectedChange = (progressBarId) => {
    const updatedProgressBarListData = progressBarListData?.map(item => {
      return ({
        ...item,
        selected: item.id === parseInt(progressBarId) ? true : false,
      });
    });
    setProgressBarListData(updatedProgressBarListData);
  };
  
  const handleMaintainButtonClick = (maintainValue) => {
    const updatedProgressBarListData = progressBarListData?.map(item => {
      let updatedCompleted = parseInt(item.completed) + parseInt(maintainValue);
      if(updatedCompleted > data.limit) {
        updatedCompleted = data.limit;
      }
      if(updatedCompleted < 0) {
        updatedCompleted = 0;
      }
      return ({
        ...item,
        completed: item.selected ?
        updatedCompleted : item.completed,
      });
    });
    setProgressBarListData(updatedProgressBarListData);
  };
  
  
  if(error) {
    return (
      <div className="widget">
        <h2>Progress Bars Demo</h2>
        <p>{ error }</p>
      </div>
    );
  }
  
  if(loading) {
    return (
      <div className="widget">
        <h2>Progress Bars Demo</h2>
        <h2>Loading...</h2>
      </div>
    );
  }
  
  return (
    <div className="widget">
      <h2>Progress Bars Demo</h2>
      <>
        <div className='widget__bar' >
          <ProgressBarList 
            data={progressBarListData}/>      
        </div>
        <div className='widget__control'>
          <div className='widget__menu'>
            <DropDownMenu
              progressBarListData={progressBarListData}
              onProgressBarSelectedChange={handleProgressBarSelectedChange}
          />
          </div>
          <div className='widget__buttons'>
            <Buttons
              data={data?.buttons}
              onMaintainButtonClick={handleMaintainButtonClick}
          />
          </div>
        </div>
      </> 
    </div>
  );
};

export default ProgressBarWidget;
