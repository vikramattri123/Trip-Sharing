import React from 'react'
import classes from '../css/User_Card.module.css';
import User_Image from '../Images/user.png';
const User_Card = () => {
  return (
    <>
    <div className={classes.card}>
    <img src={User_Image} alt="Avatar" width="150px"/>
    <div className={classes.container}>
      <h4><b>John Doe</b></h4> 
      <p>Architect & Engineer</p> 
    </div>
  </div>
  </>
  )
}

export default User_Card