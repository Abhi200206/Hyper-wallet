import { useEffect, useState } from "react";
import {Routes,Route, useNavigate,useParams } from "react-router-dom";
import Renderusers from "./Renderusers";
export default function Dashboard()
{
    let [val,setVal]=useState({
        value:"",
        isdisp:false
    })
    let [data,setData]=useState([]);
    const {user}=useParams();
    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/user/")
        .then(async (data)=>{
            let values=await data.json();
            console.log("values : ",values)
            setData(values);

        })
    },[])
    function search(e)
    {
        let search=e.target.value;
        let arr=data;
        for(let i=0;i<arr.length;i++)
        {
            if(search==arr[i].firstname)
            {
                setVal({
                    value:arr[i].firstname+" "+arr[i].lastname,
                    isdisp:true
                });
            }
        }

    }


    return(
        <div className="p-6 ">
            <div className="flex justify-between pb-2 border-b">
                <div><p>Hyper-Wallet</p></div>
                <div>Hello, {user}</div>
            </div>
            <div>
                <div>Your Balance: </div>
                <p>Users</p>
                <input   onChange={search} className=" mt-4 pb-2 border-[1px] rounded px-2 py-1 w-[100%]  mb-4" type="text" placeholder="search users..." />
            </div>
            <div>
                <Renderusers data={data}/>
            </div>
            {val.isdisp && <div className="absolute top-[160px] ">
                <p>{val.value}</p>
                </div>}
        </div>
    )
}