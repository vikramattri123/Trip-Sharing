import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import User_Auth from '../Global_Context/User_Auth';
import Create_Post from './Create_Post';
import { UseHttpRequest } from './Custom_Hook/UseHttpRequest';
import ErrorMessage from './ErrorMessage';
import Post_Card from './Post_Card';
import RotateModal from './RotateModal';
import User_Card from './User_Card';


function Dashboard({onConfirm}) {

   const [StoreData,setData] = useState([]);

   const AuthContext = useContext(User_Auth);

  const{IsError,sendRequest,setLoading,IsLoading,ClearError} = UseHttpRequest();
  console.log("Data Base Value ",AuthContext.token);

   useEffect (() =>
   {

         const Fetchdata= async() =>
         {
          const url = "http://localhost:6200/place/AllPost";
          const response = await sendRequest(url);

          // const responseData = response.json();

          console.log("Upcoming Data",response);
          setData(response.place.reverse() || []);

         }
         Fetchdata();

   },[onConfirm]);


  return (
    <>
    {IsLoading && <RotateModal/>}
    {IsError && <ErrorMessage message={IsError} onConfirm={ClearError}/>}
    <Card style={{marginTop:'40px',marginLeft:'0px',border:'none',display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',gap:'30px',marginBottom:'30px',alignItems:'center'}}>
      {StoreData.length > 0 && !IsLoading && StoreData.map((val) =>  <Post_Card title={val.title} userlikedpost={val.userlikedpost} postid={val.id} image={val.image} description={val.description} address={val.address} userid={val.userid} username={val.username} TotalLikes={val.TotalLikes}/>)}

    </Card>
    <Card style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'70px',border:'none'}}>
      {!IsLoading && StoreData.length === 0 &&<Card.Title>You have Shared No Post ,Create Post .....</Card.Title>}
    </Card>
    </>
  );
}

export default Dashboard;