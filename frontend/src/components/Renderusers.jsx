export default function Renderusers({data})
{
    let ele=data.map((m)=>{
        return(
            <div key={m._id} className="flex justify-between py-1   ">
                <div><p>{m.firstname+" "+m.lastname}</p></div>
                <div className="bg-black cursor-pointer rounded p-1">
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