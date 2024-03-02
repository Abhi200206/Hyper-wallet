export default async function check()
{
    console.log("inside");
    let result=await fetch("http://localhost:3000/api/v1/user/check",{
        headers:{authorization:localStorage.getItem("token")}
    });
    let final=await result.json();
    console.log(final);
    return final
}