import { useEffect, useState } from "react";
import {Routes,Route, useNavigate,useParams } from "react-router-dom";
import Renderusers from "./Renderusers";
import check from './check'
export default function Dashboard()
{
    let navigate=useNavigate()
    let [val,setVal]=useState({
        value:"",
        isdisp:false
    });
    let [amount,setAmount]=useState(0);
    let [data,setData]=useState([]);
    const {user}=useParams();
    const [userid,setUserid]=useState("");
    useEffect(()=>{
        let bool=check();
        bool.then((val)=>{
          console.log("bool val: ",val.value);
        if(!val.value)
        {
            navigate('/signin');
        }
        })
      },[])
    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/user/",{
            headers:{username:user}
        })
        .then(async (data)=>{
            let values=await data.json();
            setData(values);

        })
    },[]);
    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/user/amount",{
            headers:{
                username:user
            }
        })
        .then(async(data)=>{
            let amt=await data.json();
            setAmount(amt.amount);
            setUserid(amt.id);
        })
    },[])
    
    let logout=()=>{
        localStorage.removeItem("token");
        navigate('/signin');
    }


    return(
        <div className="p-6 ">
            <div className="flex justify-between pb-2 border-b">
                <div><p className="font-black text-[20px] bg-gradient-to-r from-purple-400 to-pink-500 p-1">Hyper-Wallet</p></div>
                <div className="flex gap-2">
                    <div className="hidden md:block">Hello, {user}</div>
                    <div onClick={logout} className="p-1 bg-black text-white rounded cursor-pointer"><p>logout</p></div>
                </div>
            </div>
            <div>
                <div>Your Balance: RS.{ amount}</div>
                <p>Users</p>
                <input    className=" mt-4 pb-2 border-[1px] rounded px-2 py-1 w-[100%]  mb-4" type="text" placeholder="search users..." />
            </div>
            <div>
                <Renderusers id={userid} user={user} data={data}/> 
            </div>
            {val.isdisp && <div className="absolute top-[160px] ">
                <p>{val.value}</p>
                </div>}
        </div>
    )
}