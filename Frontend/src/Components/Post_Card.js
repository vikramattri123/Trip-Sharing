import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Star from '../Images/Star.png';
import Share from '../Images/share.png';
import Like_Star from '../Images/like_star.png';
import User from '../Images/user.png';
import { UseHttpRequest } from './Custom_Hook/UseHttpRequest';
import Image from 'react-bootstrap/Image'
import OptionButton from './OptionButton';
import { NavLink } from 'react-router-dom';
import User_Auth from '../Global_Context/User_Auth';

const Post_Card = ({title,description,image,address,userid,userlikedpost,username,TotalLikes,postid}) => {

 
  const [PostStatus,setPostStatus] = useState(false);


  const [Total,setTotalLikes] = useState(0);

  const {sendRequest} = UseHttpRequest();

  const AuthContext = useContext(User_Auth);

  console.log("Post_id",username);

  const user_profile_link = userid+"-"+username.split(" ").join("+");
  
  const LikedPost = () =>
  {
    if(Total >= 0)
    { 
    let valueUpdate = Total + 1;
    // setLikePost(true);
    setPostStatus(true);
    setTotalLikes(valueUpdate);
    const ReUploadData = async() =>
    {
    const responseData =await sendRequest(`http://localhost:6200/place/LikePost/${postid}`,'PATCH',{'Content-Type':'application/json',Authorization:'Bearer ' + AuthContext.token},JSON.stringify({TotalLikes:valueUpdate,userid:AuthContext.user_id}));
    }
    ReUploadData();
  }
  }


  const UnLikedPost = async() =>
  {
    if(Total > 0)
    {
      let valueUpdate = Total - 1;
      // setLikePost(false);
      setTotalLikes(valueUpdate);
      setPostStatus(false);
      const ReUploadData = async() =>
      {
      const responseData =await sendRequest(`http://localhost:6200/place/LikePost/${postid}`,'PATCH',{'Content-Type':'application/json',Authorization:'Bearer ' + AuthContext.token},JSON.stringify({TotalLikes:valueUpdate,userid:AuthContext.user_id}));
      }
      ReUploadData();
    }
   
  }
  useEffect(() =>
{
  setTotalLikes(TotalLikes);
  console.log(" current post status ",PostStatus);
   function Excecute () 
   {
    userlikedpost.map((val) => {
         if(val === AuthContext.user_id)
         {
          console.log(" i worked");
          setTotalLikes(TotalLikes);
          setPostStatus(true);
          return;
         }
         else
         {
          console.log(" i worked here");
          setPostStatus(false);
          return ;
         }
    })
  }
    Excecute();
},[userlikedpost])

  console.log("here",username)

  return (
    <>
   <Card style={{ width: '38rem',marginTop:'50px'}}>
    <Card style={{display:'flex',gap:'1px',marginLeft:'9px',flexDirection:'row',width:'14rem',border:'none',outline:'none'}}>
    <NavLink to={`/myprofile/${user_profile_link}`} style={{textDecoration:'none',display:'flex'}}>
    <Image src={AuthContext.image ? AuthContext.image : User}  style={{width:'32px',height:'30px',marginTop:'10px',borderRadius:'50px'}}/>
    <Card.Title style={{fontSize:'15px',fontWeight:'bold',padding:'16px',color:'black',display:'flex',justifyContent:'flex-start'}}>{username}</Card.Title>
    </NavLink>
   {AuthContext.user_id!=userid && <Button variant="primary" style={{padding:'6px',marginTop:'10px',height:'27px',fontSize:'13px'}}>follow</Button>}
   </Card>
   <Card style={{height:'400px',border:'none'}}>
      <Card.Img variant="top" src={image} style={{borderRadius:'0px',display:'block',width:'100%',height:'100%',backgroundSize:'cover'}} />
      </Card>
      <Container style={{display:'flex',justifyContent:'flex-start',gap:'15px',padding:'13px'}}>
      {PostStatus && <img src={Like_Star} height="24px" width="24px" onClick={UnLikedPost} title="share post"/> }
      {!PostStatus && <img src={Star} height="24px" width="24px" onClick={LikedPost}/> }
      <img src={Share} height="24px" width="24px"/>
      </Container>
     <h6 style={{marginLeft:'13px',fontWeight:'bold'}}> {Total} Likes </h6>
      <Card.Body>
        <Card.Title style={{fontSize:'20px'}}>{title}</Card.Title>
        <Card.Text style={{fontSize:'14px'}}>
          {description}
        </Card.Text>
       
      </Card.Body>
    </Card>
    </>
  )
}

export default React.memo(Post_Card);