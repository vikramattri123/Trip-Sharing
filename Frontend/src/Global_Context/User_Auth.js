
import { createContext, useCallback, useEffect, useState } from "react";


const User_Auth = createContext({
    User_Access:false,
    login:(data)=>{},
    logout:()=>{},
    image:'',
    user_id:'',
    username:'',
    token:null
});

let TimerStore;

export const Auth_State_Provider  = (props) =>
{
    const [auth_state,setauth_state] = useState(false);

    const [newuser_id,setnewuser_id] = useState('');
    const [Username,setUsername] = useState('');
    
    const [Image,setImage] = useState('');

    const [auth_token,setauth_token] = useState(null);

    const [expirationTime,setexpirationTime] = useState(null);
    useEffect(() =>
    {
      console.log(" ir un at first");
      const getToken = JSON.parse(localStorage.getItem('Authenticate_Token'));
      if(getToken && getToken.token && new Date(getToken.expirationTime) > new Date())
      {
         LoginHandler({
          token:getToken.token,
          userid:getToken.userid,
          expirationTime:new Date(getToken.expirationTime),
          username:getToken.username,
          image:getToken.image
         });
      }
    },[])

    useEffect(()=>{
      const getToken = JSON.parse(localStorage.getItem('Authenticate_Token'));
      console.log("you called me ");
      if(getToken)
      {
        if(getToken.token && getToken.expirationTime)
        {
          const Time_Left = new Date(getToken.expirationTime).getTime() - new Date().getTime();
          TimerStore = setTimeout(LogoutHandler,Time_Left);
        }
        else
        {
        clearTimeout(TimerStore);
        }
      }
    },[expirationTime,auth_token])
 

  useEffect(() =>
 {
  const getToken = JSON.parse(localStorage.getItem('Authenticate_Token'));
  if(!getToken || getToken.token === 'token_for_12seconds')
  {
   LoginHandler({image:'',userid:'',username:'',token:'token_for_12seconds'});
      setTimeout(() => {
          LogoutHandler();
      }, 12000);
  }
 },[])

    const LoginHandler = useCallback((data) =>
    {
        let token_data = data.token;
        setauth_token(token_data);
        console.log("sss",data)
        setnewuser_id(data.userid);
        setImage(data.image);
        setUsername(data.username);
          setauth_state(!!token_data);
          const getTime = data.expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
          setexpirationTime(getTime);
          localStorage.setItem('Authenticate_Token',JSON.stringify({
            token:data.token,
            userid:data.userid,
            expirationTime:getTime.toISOString(),
            username:data.username,
            image:data.image
          }));
    })

    const LogoutHandler = useCallback(() =>
    {
        // let token_data = data.token;
        setauth_token(null);
        setnewuser_id('');
        setUsername('');
        setImage('');
        setexpirationTime(null);
        setauth_state(false);
      localStorage.removeItem('Authenticate_Token');
    },[])

 

      return (
      
        
    <>



         <User_Auth.Provider value={{login:LoginHandler,logout:LogoutHandler,User_Access:auth_state,image:Image,user_id:newuser_id,username:Username,token:auth_token}}>
              {props.children}
         </User_Auth.Provider>
         </>
      )
}

export default User_Auth;