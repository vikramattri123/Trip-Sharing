import React, { useEffect, useState } from "react";

import classes from '../css/Form_Modal.module.css';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";
import Upload_Logo from '../Images/upload_2.png';
import Upload from "../Practice/Upload";


const Backdrop = (props) =>
{
   return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}

const ModalOverlay = (props) =>
{
  const [imageurl,setimageurl] = useState(Upload_Logo);

  
  const [title,setTitle] = useState('');

  const [description,setdescription] = useState('');

  const [address,setAddress] = useState('');


  const Receivedata = (data) =>
  {
     setimageurl(data);
  }

   return (
    <div className={classes.modal}>
        <header className={classes.header}>
            <div style={{display:'flex',gap:'60px',marginLeft:'20px',flexDirection:'row',width:'500px',fontSize:'13px'}}>
              <div style={{display:'flex',flexDirection:'column'}}>
               <img  src={imageurl} width="210px" height="200px" />
               <div style={{width:'80px',height:'80px'}}>
               <Upload getImage={Receivedata} title={title} description={description} address={address}/>
               </div>
               </div>
       
               <form style={{width:'600px'}}>
  <div class="form-row">
    <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
    <div class="col-lg-8 mb-4">
      <label for="validationDefault01">Title</label>
      <input type="text" class="form-control" id="validationDefault01" placeholder="Add title"  onChange={(e) => setTitle(e.target.value)} required/>
    </div>
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
    <div class="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setdescription(e.target
    .value)
    } required></textarea>
  </div>
    <div class="col-sm-8 mb-7">
      <label for="validationDefault02">Address</label>
      <input type="text" class="form-control" id="validationDefault02" placeholder="" onChange={(e) => setAddress(e.target.value)
      } required/>
    </div>
    </div>
    
  </div>

  


</form>
            
</div>
        </header>
        <footer className={classes.actions}>
          <button onClick={props.onConfirm}>Close</button>
        </footer>
      </div>
   )
}

const Create_Post = (props) =>{
     return(
        <>
        {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm}/>,document.getElementById('backdrop-root'))}
        {ReactDOM.createPortal(<ModalOverlay onConfirm={props.onConfirm} />,document.getElementById('overlay-root'))}
        </>
     )
}

export default Create_Post