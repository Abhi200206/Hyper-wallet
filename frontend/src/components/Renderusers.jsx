import { Route, Routes, useNavigate } from "react-router-dom"
import Send from "./Send";

export default function Renderusers({data,id})
{
    let navigate=useNavigate();
    let ele=data.map((m)=>{
        return( 
            <div key={m._id} className="flex justify-between py-1   ">
                <div><p>{m.firstname+" "+m.lastname}</p></div>
                <div onClick={()=>navigate(`/send?id=${id}&name=${m.firstname+" "+m.lastname}&sid=${m._id}`)} className="bg-black cursor-pointer rounded p-1">
                    <p className="text-white">send money</p>
                </div>
                
            </div>
        )
    })
    return(
        <div>
                {ele}
                
        </div>
    )
}