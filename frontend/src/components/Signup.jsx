import { useEffect, useState } from "react";
import {Routes,Route, useNavigate,useParams } from "react-router-dom";
export default function Signup()
{
    let navigate=useNavigate();
    const [value,setValue]=useState({
        username:"",
        password:"",
        firstname:"",
        lastname:"",
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
            fetch("http://localhost:3000/api/v1/user/signup",
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(value)
            }).then(async(data)=>{
              let result=  await data.json();
              console.log("token: ",result.token);
              if(result.send)
              {
                    localStorage.setItem("token",result.token)
                    navigate(`/${value.username}/dashboard`);
              }
              else{
                alert("Username already exists choose another one !");
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
                <p className="font-bold text text-[25px] text-center text-black">Sign Up</p>
                <p className="text-gray-500 text-[13px]">Enter your information to create an</p>
                <p className="text-center text-gray-500 text-[13px]"> account</p>
                <div>
                    <p className="font-medium pb-2 text-left text-[15px] ">First Name</p>
                    <input name="firstname" onChange={call} className="pb-2 border-[1px] rounded px-2 py-1 " type="text" placeholder="rahul" />                   
                    <p className="font-medium pb-2 text-left text-[15px] ">Last Name</p>
                    <input name="lastname" onChange={call} className="pb-2 border-[1px] rounded px-2 py-1 " type="text" placeholder="boini" />
                    <p className="font-medium pb-2 text-left text-[15px] ">Email</p>
                    <input name="username" onChange={call} className="pb-2 border-[1px] rounded px-2 py-1 " type="text" placeholder="rahulboini@gmail.com" />
                    <p className="font-medium pb-2 text-left text-[15px] ">Password</p>
                    <input name="password" onChange={call} className="pb-2 border-[1px] rounded px-2 py-1 mb-4" type="text" />
                    <div onClick={()=>{setValue((v)=>({...v,isyes:true}))}} className="bg-black rounded text-center py-1 cursor-pointer hover:bg-slate-800 "><p className="text-white">Signup</p></div>
                    <p className="text-black pt-2">Already have an account? <a className="cursor-pointer" onClick={()=>{navigate('/signin')}}>Login</a></p>
                </div>
                </div>

            </div>
        </div>
    )
}