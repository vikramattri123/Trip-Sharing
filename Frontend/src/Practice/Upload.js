import { ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { storage } from './Firebase';
import {v4} from "uuid";
import RotateModal from '../Components/RotateModal';
import ErrorMessage from '../Components/ErrorMessage';
import { UsePath } from '../Components/Custom_Hook/UsePath';
import Upload_Logo from '../Images/upload_2.png';
import User_Auth from '../Global_Context/User_Auth';
import { UseHttpRequest } from '../Components/Custom_Hook/UseHttpRequest';

const Upload = ({title,description,address,getImage}) => {

const [select,setselect] = useState(null);

const {sendRequest,IsError,ClearError,setError} = UseHttpRequest();


const AuthContext = useContext(User_Auth);
console.log("current name",AuthContext.username)

const {CreatPath} = UsePath();

const [imageurl,setimageurl] = useState('');


const [IsLoading,setIsLoading] = useState(false);

const  [UploadStatus,setUploadStatus]  =useState(false);

const [showButton,setButton] = useState(true);

useEffect(()=>
{
  
    if(description.length>0 && address.length>0)
    {
       setButton(false);
    }
    if(!select)
    {
      getImage(Upload_Logo)
    }
},[title,description,address,select])



 const SelectFile = (e) =>
 {
  console.log("hii");
setselect(e.target.files[0]);
const data = e.target.files[0];
if(data)
{
setimageurl(URL.createObjectURL(e.target.files[0]));
getImage(URL.createObjectURL(e.target.files[0]));
}
 }

 const Uploading = async(e) =>
 {
    e.preventDefault();
    setUploadStatus(false);
    setIsLoading(true);
    console.log("myfile ",select);
     const formData = new FormData();
     console.log(imageurl);
     try
     {
      if(!select) 
      {
        throw new Error('Please Attach image to Upload !');
      }
      
      formData.append("Images",select,``);
     const imageref = await ref(storage,`Images/${AuthContext.user_id + v4()}`);
     console.log(imageref);
     const imageurlpath = await uploadBytes(imageref,select).then((res) =>{

      const Host = res.ref._service._host;
      const db_name = res.metadata.bucket;
      const Path = res.metadata.fullPath;
      
     const responseData = CreatPath(Host,db_name,Path);
     return responseData;
  
     });

     const create_post = {
      title,
      description,
      address,
      image:imageurlpath,
      userid:AuthContext.user_id,
      username:AuthContext.username,
      TotalLikes:0
     }
   const headers ={
    'Content-Type':'application/json',
    authorization : 'Bearer ' + AuthContext.token
   }
    const responseData = await sendRequest('http://localhost:6200/place/','POST',headers,JSON.stringify(create_post));
    console.log(responseData);
    // setLoading(false);
    if(responseData)
    {
      setIsLoading(false);
      setUploadStatus(true);
    }
 
     }
     catch(e)
     {
      setIsLoading(false);
      setError(e.message)
     }
 }
 
 

  return (
    <form>
      <div>
        <div >
  {IsLoading && <RotateModal/>}
  </div>
  </div>
  {IsError && <ErrorMessage message={IsError} onConfirm={ClearError}/>}
{!IsLoading && !UploadStatus &&
 <><label for="imageUpload" class="btn btn-primary btn-block btn-outlined" style={{marginTop:'20px',width:'120px'}}>Select image</label>
<input type="file" id="imageUpload" accept="image/*" style={{display: 'none'}} onChange={SelectFile}/>
<button class="btn btn-primary" disabled={showButton} style={{marginTop:'30px',width:'220px',display:'flex',justifyContent:'center',alignContent:'center',backgroundColor:'white!important'}} onClick={Uploading}>Create Post</button>

</>
}

{ UploadStatus && <p style={{color:'#1976d2',width:'200px',marginTop:'50px',fontWeight:'bold'}}>New Post Created Succesfully!</p>}
    </form>
  )
}

export default Upload