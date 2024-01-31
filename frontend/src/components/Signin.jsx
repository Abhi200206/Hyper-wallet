import { useState,useEffect } from "react";
import {Routes,Route, useNavigate,useParams } from "react-router-dom";
export default function Signup()
{
   let navigate= useNavigate();

    const [value,setValue]=useState({
        username:"",
        password:"",
        isyes:false
    })
    function call(e)
    {
        setValue((v)=>{
            return ({
                ...v,
                [e.target.name]:e.target.value
            })
        })
    }
    console.log("state: ",value);
    useEffect(()=>{
        if(value.isyes)
        {
            fetch("http://localhost:3000/api/v1/user/signin",
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(value)
            }).then(async(data)=>{
              let result=  await data.json();
              console.log("result: ",result);
              if(result.send)
              {
                localStorage.setItem("token",result.token)
                    navigate(`/${value.username}/dashboard`);
              }
              else{
                alert("invalid username or password !");
              }
            
            }).then(()=>{
                setValue((v)=>{
                    return({
                        ...v,
                        isyes:false
                    })
                })
            })
            
        }
    },[value.isyes])
    return (
        <div className="pt-12">
            <div className="flex  justify-center">
                <div className="border-[1px] px-8    py-4 rounded">
                <p className="font-bold text text-[25px] text-center text-black">Sign In</p>
                <p className="text-gray-500 text-[13px]">Enter your information to create an</p>
                <p className="text-center text-gray-500 text-[13px]"> account</p>
                <div>
                    <p className="font-medium pb-2 text-left text-[15px] ">Username</p>
                    <input onChange={call} name="username" className="pb-2 border-[1px] rounded px-2 py-1 " type="text" placeholder="rahul" />                   
                    <p className="font-medium pb-2 text-left text-[15px] ">Password</p>
                    <input onChange={call} name="password" className="pb-2 border-[1px] rounded px-2 py-1 mb-4" type="text" />
                    <div onClick={()=>{setValue((v)=>({...v,isyes:true}))}} className="bg-black rounded text-center py-1 cursor-pointer hover:bg-slate-800 "><p className="text-white">Signin</p></div>
                    <p className="text-black pt-2">Dont't have an account? <a className="cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign up</a></p>
                </div>
                </div>

            </div>
        </div>
    )
}