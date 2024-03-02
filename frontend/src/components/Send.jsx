import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
export default function Send()
{
    let navigate=useNavigate();
    const [amount,setAmount]=useState("");
    const [val,setVal]=useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    let name=searchParams.get("name");
    let sendid=searchParams.get("sid");
    let id=searchParams.get("id"); 
    useEffect(()=>{
        if(val)
        {
            fetch("http://localhost:3000/api/v1/user/send",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                senderid:id,
                receiverid:sendid,
                amount:amount
            })
        }).then(async (data)=>{
            let result=await data.json();
            console.log(result);
            setVal(false);
            if(result.err)
            {
                alert(result.err);
            }
            else{
                alert(result.value);
                setAmount("");
                navigate(`/${result.username}/dashboard`);
            }
        })
        }
    },[val]);

    return (
        <div className="flex justify-center">
        <div className=" mt-6 pt-4 border-[1px] p-2 rounded ">
                <div >
                    <p className="font-black text-center text-[20px] pb-8">Send Money</p>
                    <div className="text-center">
                        <p className="font-bold text-[18px] ">{name} </p>
                    </div>
                    <div>
                        <p className="text-left pl-2 font-bold text-[10px] ">Amount (in Rs)</p>
                    </div>
                    <div>
                        <input onChange={(e)=>setAmount(e.target.value)} value={amount} className="border-[1px] m-2" type="number" placeholder="enter amount to transfer" />
                    </div>
                    <div onClick={()=>setVal(true)} className="bg-black text-white text-center rounded py-2 cursor-pointer">
                        <p>send Money</p>
                    </div>
                </div>
        </div>
        </div>
    )
}