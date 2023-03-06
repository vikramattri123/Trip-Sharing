import React from 'react';
import ReactDOM from 'react-dom';
import classes from '../css/Form_Modal.module.css';
const ErrorModalBackdrop = (props) =>
{
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}


const ErrorModalOverlay = (props) =>
{
    return (
        <div className={classes.modal}>
            <header className={classes.header}>
                <div style={{display:'flex',gap:'20px',flexDirection:'row',width:'500px',fontSize:'13px'}}>
                <h4>{props.message}</h4>
                
    </div>
            </header>
            <footer className={classes.actions}>
              <button style={{fontSize:'19px',fontWeight:'bold',color:'#1976d2',backgroundColor:'whitesmoke',border:'none'}}onClick={props.onConfirm}>X</button>
            </footer>
          </div>
       )
}


const ErrorMessage = (props) => {
    console.log("here 2",props);
  return (
    <>
    {ReactDOM.createPortal(<ErrorModalOverlay message={props.message} onConfirm={props.onConfirm}></ErrorModalOverlay>,document.getElementById('errorbackdrop-root'))}
    {ReactDOM.createPortal(<ErrorModalBackdrop onConfirm={props.onConfirm}></ErrorModalBackdrop>,document.getElementById('errorbackdrop-root'))}
    </>
  )
}

export default ErrorMessage