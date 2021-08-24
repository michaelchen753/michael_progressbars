import React from 'react';
import './ProgressBar.scss'

const ProgressBar = ({ item }) => {
    // ******Please use StyledComponent
    const containerStyles = {
        height:42,
        width:'100%',
        marginTop:10,
        marginBottom:12,
        textAlign:'center',
    }

    const fillerStyles = {
        height:'100%',
        width: `${item.completed > 100 ? 100 : item.completed}%`,
        backgroundColor: `${item.completed > 100 ? 'red' : 'lightblue'}`,
        textAlign: 'center',
    }

    const lableStyles = {
        color:'black',
        textAlign:'center',
    }

    return (
        <div
            className='bar_container'
            style={containerStyles}
        >
            <div className='indicator'
                data-testid={`progressbar_indicator_${item.id}`}
                style={lableStyles}
            >
                {`${item.completed}%`}
            </div>
            <div
                className='filler'
                id ={`filler_${item.id}`}
                style={fillerStyles}
                data-testid={`progressbar_${item.id}`}
            />  
        </div>        
    )
};

export default ProgressBar;

