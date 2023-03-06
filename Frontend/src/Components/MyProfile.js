import React, { useContext, useEffect, useState } from 'react';
import { Card, Image,Container, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UseHttpRequest } from './Custom_Hook/UseHttpRequest';
import '../css/Myprofile.css';
import User_Auth from '../Global_Context/User_Auth';
import Like_Star from '../Images/like_star.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ErrorMessage from './ErrorMessage';
import RotateModal from './RotateModal';
import Upload from '../Practice/Upload';

const MyProfile = (props) => {

   const {IsError,sendRequest,IsLoading,ClearError,setError} = UseHttpRequest();

   const AuthContext = useContext(User_Auth);

   const [AllPost,setAllPost] = useState();
   
   const {uid} = useParams();

   let User_info = uid.split("-");

   let username = User_info[1];

   username = username.split("+").join(" ");


   const user_id = User_info[0];

   console.log("userid current",typeof user_id,typeof AuthContext.user_id);


   console.log("this is ypur id" ,typeof uid);

  //  console.log("image can",AuthContext.image);

    useEffect(() =>
    {
      console.log("reload");

         const FetchAllPost = async( ) =>
         {
            try
            {
             const responseData =  await sendRequest(`http://localhost:6200/place/${user_id}`);
             console.log("A user all id",responseData);
              setAllPost(responseData.places||[]);                 
            }
            catch(e)
            {
                setError("Could not able to Access");
            }
         }
         FetchAllPost();
    },[uid])
  return (
    <>
    {IsLoading && <RotateModal></RotateModal> }
    {IsError &&  <ErrorMessage onConfirm ={ClearError}/>}
  
     {AllPost && !IsLoading && <Container style={{display:'flex',width:'38rem',justifyContent:'center',alignContent:'center',marginTop:'90px',flexDirection:'column',width:'100%'}}>
        <Container style={{display:'flex',justifyContent:'space-evenly',gap:'10px',alignContent:'center'}}>
         <Card style={{border:'none'}}>
            {AllPost &&   <Image src={AllPost.image} style={{width:"200px",height:'200px',padding:'10px',borderRadius:"50px",border:'none'}} />}
         </Card>
         <Card style={{padding:'40px',width:'520px',border:'none'}}>
            {AllPost && <Card.Text style={{fontWeight:'bold',fontSize:'25px'}}>{AllPost.username}</Card.Text>}
            <Card style={{display:'flex',flexDirection:'row',gap:'40px',border:'none'}}>
            <Card.Text style={{fontWeight:'bold'}}>{AllPost.place.length} Posts</Card.Text>
            <Card.Text style={{fontWeight:'bold'}}>0 Followers</Card.Text>
            <Card.Text style={{fontWeight:'bold'}}>0 Following</Card.Text>
            </Card>
         </Card>
    
         </Container>
         <Container style={{display:'flex',justifyContent:'center',marginTop:'20px',alignItems:'center'}}>
            <Card.Header style={{fontWeight:'bold'}}>{AuthContext.user_id === user_id ?  "My Post" : `${username} Post`}</Card.Header>
         </Container>
         <hr/>
         {
         AllPost && AllPost.place.length === 0  && !IsLoading &&
         <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><h5 style={{marginTop:'50px'}}>You have Posted Nothing, Please Share Something ...</h5></div> 
        }
         <Container className="ImageContainer">
            
            {AllPost && AllPost.place.map((val) => 

            <div className="containers">
            <img src={val.image} alt="Avatar" className="image" />
            <div className="overlay">
              
              <div className="text">
              <img img src={Like_Star} height="24px" width="24px"/><b style={{fontSize:'18px'}}>{val.TotalLikes}</b>
               </div>
            </div>
          </div>
             )}
              
        </Container>
        </Container>}
        
        
    </>
  )
}

export default MyProfile