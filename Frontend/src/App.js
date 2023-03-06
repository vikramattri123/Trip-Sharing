import logo from './logo.svg';
import './App.css';
import SideBar from './Components/SideBar';
import TopBar from './Components/Navbar';
import { Routes,Route, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Upload from './Practice/Upload';
import { Container } from '@mui/system';
import Pdf from './Practice/Pdf';
import Create_Post from './Components/Create_Post';
import { useContext, useEffect, useState } from 'react';
import Auth from './Components/Auth/Auth';
import User_Auth from './Global_Context/User_Auth';
import MyProfile from './Components/MyProfile';

// import Use from './Practice/Use';

function App() {

  const [show_formModel ,setFormModel] = useState(false);

  const  navigate = useNavigate();


  const AuthContext = useContext(User_Auth);

 const ChangeStatus = () =>
 {
    setFormModel(!show_formModel);
 }




  return (    
    <>
    {/* <div style={{display:'flex'}}> */}
    

    
    <SideBar onConfirm={ChangeStatus}/>
    {  show_formModel && AuthContext.token &&<Create_Post onConfirm={ChangeStatus}/> }
  {/* <Container sx={{display:'flex',justifyContent:'center',alignItems:'center'}}> */}

   <Routes>
   {!AuthContext.token && <Route path='/'  element={<Auth/>}></Route>}
   {AuthContext.token && <Route path='/'  element={<Dashboard onConfirm={ChangeStatus}/>}></Route>}
   {AuthContext.token && <Route path='/myprofile/:uid'  element={<MyProfile/>}></Route>}
 </Routes>
 {/* </Container> */}


        
    {/* </div> */}
     </>
     
  );
}

export default App;

