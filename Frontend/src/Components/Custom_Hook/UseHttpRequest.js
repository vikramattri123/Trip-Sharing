import React, { useState,useCallback, useEffect } from "react";


export const UseHttpRequest = () =>
{

   const [IsLoading,setLoading] = useState(false);
   const [IsError,setError] = useState(null);

       const sendRequest = useCallback(async(url,method = 'GET',headers={},body=null)=>
       {

        setLoading(true);
        console.log("data",url,method,headers,body);
        try{
       const response =  await fetch(url,
                {method,headers,body});
                const responseData = await response.json();

                if(!response.ok)
                {
                    console.log('i run');
                    throw new Error(responseData);
                    // setError(responseData);
                }
                // if(response.ok)
                // {
                //     setError('Your Account created Succesfully !' + body.name)
                // }
                setLoading(false);
                return responseData;
              
            }
            catch(err)
            {
                console.log(err);
                setLoading(false);
                setError(err.message);
            }

       },[])

       const ClearError= () =>
       {
           setError(null);
       }
       return {IsError,setLoading,IsLoading,sendRequest,setError,ClearError}
}
