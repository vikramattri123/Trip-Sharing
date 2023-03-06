import React, { useState,useCallback, useEffect } from "react";
export const UsePath = () =>
{

    // const [postpath ,setpostpath] = useState('');

    const CreatPath = useCallback((Host,db_name,Path) =>
    {

        const Hash_path = Path.split("/").join('%2F').split(" (").join("%20(").split(" ").join("%2F");
    console.log("this",Hash_path);
        const url = `https://${Host}/v0/b/${db_name}/o/${Hash_path}?alt=media`;
        console.log(url);
        // console.log(postpath.downloadTokens);
        //    console.log(Host,db_name,Path);
        //    setpostpath()
           
           return url;
    });

    return {CreatPath};
} 