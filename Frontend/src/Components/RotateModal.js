import React from 'react';
import classes from '../css/Loadder.module.css';

const RotateModal = () => {
  return (
    <>
    <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
        <div className={classes.loader}></div>
    </div>
    </>
  )
}

export default RotateModal