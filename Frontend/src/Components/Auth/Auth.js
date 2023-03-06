import React, { useContext, useState } from 'react'
import ErrorMessage from '../ErrorMessage';
import { UseHttpRequest } from '../Custom_Hook/UseHttpRequest';
import RotateModal from '../RotateModal';
import User_Auth from '../../Global_Context/User_Auth';

const Auth = () => {

  const [statusType ,setstatusType] = useState(true); 

  const AuthContext = useContext(User_Auth);


   const {IsError,IsLoading,sendRequest,ClearError} = UseHttpRequest();

   const [Username,setUsername] = useState();

  const [Email,setEmail] = useState();

  const [Password,setPassword] = useState();

  const [NewPassword,setNewPassword] = useState(); 

  const [password,setchangepassword] = useState(false);

  const [message,setmessage] = useState();

  
  const ChangePassword = () =>
  {
     setchangepassword(true);
  }

  const LogInButton = () =>
  {
    setchangepassword(false);
    setstatusType(true);
    setmessage('');
  }
  const SignUpButton = () =>
  {
    setchangepassword(false);
    setstatusType(false);
    setmessage('');
  }


   const SubmitHandler = async(e) =>
   {
      if(statusType && !password)
      {
         const url = "http://localhost:6200/user/SignUp";

         const Data = {
            name:Username,
            email:Email,
            password:Password,
            image:"https://cdn-icons-png.flaticon.com/512/149/149071.png"

         }

         const headers = {
            'Content-Type' :'application/json'
         }
        try
        {
         const responseData= await sendRequest(url,'POST',headers,JSON.stringify(Data));
        //  console.log("here",Datas.user.id);
        const sendData = {
            userid:responseData.userid,
            username:responseData.username,
            token:responseData.token,
            image:responseData.image
        }
        AuthContext.login(sendData);
         setUsername('');
         setEmail('');
         setPassword('');
        }
        catch(e)
        {

        }

      }
      else if(!statusType && !password)
      {
        const url = "http://localhost:6200/user/Login";
  
        const data = {
            email:Email,
            password:Password
        }
        const headers ={
            'Content-Type' : 'application/json'
        }
        try{
            const responseData = await sendRequest(url,'POST',headers,JSON.stringify(data));
            const sendData = {
                userid:responseData.userid,
                username:responseData.username,
                token:responseData.token,
                image:responseData.image
            }
            AuthContext.login(sendData);
            // AuthContext.login(responseData.user.Username);
            console.log(responseData);
        }
        catch(e)
        {
            throw new Error(e);
        }
      }
      else if(password)
      {
        const url = `http://localhost:6200/user/resetpassword/${Email}`;
        const headers ={
          'Content-Type' : 'application/json'
       }
        const responseData = await sendRequest(url,'PATCH',headers,JSON.stringify({Newpassword:NewPassword,password:Password}));
        setmessage(responseData.message);
      }
    
   }

   const check =  statusType && !password ? 'Sign Up'  : !statusType && !password ? 'Sign In' : 'Reset Password';


  return (
    <>
    {IsLoading && <RotateModal/>}
    {IsError && <ErrorMessage message={IsError} onConfirm={ClearError}/>}
    {!IsLoading &&
    <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
    <div style={{width:'320px',marginTop:'120px',border:'1px solid maroon',backgroundColor:'F5F5F5',padding:'26px',borderRadius:'10px',backgroundColor:'white'}}>
    <form>
  <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',gap:'20px',marginTop:'0px'}}>
   

     <h4 style={{fontSize:'17px'}}>Welcome to Your Trip</h4>
     <h6 style={{fontSize:'11px',color:'#363636'}}>let's login to share your post</h6>
     <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',gap:'10px'}}>
   {statusType && !password &&
   <div class="col">
      <input type="text" class="form-control" placeholder="Username"  onChange={ (e) => setUsername(e.target.value)} style={{width:'250px',height:'35px',backgroundColor:'F5F5F5'}}/>
    </div>
 }
    <div class="col">
      <input type="text" class="form-control" placeholder="Email"  onChange={ (e) => setEmail(e.target.value)} style={{width:'250px',height:'35px',backgroundColor:'F5F5F5'}}/>
    </div>
    <div class="col">
      <input type="password" class="form-control" placeholder="Password" onChange={ (e) => setPassword(e.target.value)} style={{width:'250px',color:'#C0C0C0',height:'35px',backgroundColor:'F5F5F5'}}/>
    </div>
    {password &&
    <div class="col">
      <input type="password" class="form-control" placeholder="Enter New Password" onChange={ (e) => setNewPassword(e.target.value)} style={{width:'250px',color:'#C0C0C0',height:'35px',backgroundColor:'F5F5F5'}}/>
    </div>
}
    </div>
   
  </div>
  <div style={{display:'flex',flexDirection:'row',fontSize:'13px !important',marginTop:'20px',justifyContent:'space-around',gap:'26px'}}>
       {!statusType && <div onClick={LogInButton}><h5 style={{fontSize:'11px',color:'#1976d2',cursor:'pointer'}} >Create Account</h5></div>}
       {statusType &&  <div onClick={SignUpButton}><h5 style={{fontSize:'11px',color:'#1976d2',cursor:'pointer'}} >Already have a Account</h5></div>}
        <h5 style={{fontSize:'11px',color:'#1976d2',cursor:'pointer'}} onClick={ChangePassword}>Forget Password ?</h5>
    </div>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <input type="button" value={check} class="btn btn-primary btn-sm btn-block" style={{backgroundColor:'#1976d2',padding:'10px',borderRadius:'8px',borderColor:'#1976d2',width:'250px',height:'40px'}} onClick={SubmitHandler} ></input>
    </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'#1976d2'}}>
      <h4 style={{fontSize:'12px',padding:'5px'}}>{message}</h4>
    </div>
</form>
    </div>
    </div>
}
    </>
  )
}

export default Auth