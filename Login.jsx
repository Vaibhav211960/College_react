import React, { useState } from "react"

const Login = () =>{
    const [user , setUser] = useState({
        name : "john",
        password : "qwertyuiop"
    })

    const handleSubmit = e =>{
        e.preventDefault()
        if(e.target.name.value == user.name && e.target.pass.value == user.password){
            alert("login successfully")
        }else{
            alert("invalid credencials")
        }
    }

    return(
        <>
            <div className="h-full w-full ">
            <div className="h-40 w-[50%] bg-blue-200">
                <form className="flex flex-col" onSubmit={e => handleSubmit(e)}>
                    <input className="mx-2 my-4 px-2 py-4 border-2 rounded-md" type="text" placeholder="Enter your Email..." name="name" required/>
                    <input className="mx-2 my-4 px-2 py-4 border-2 rounded-md" type="password" placeholder="●●●●●●●●●" name="pass" required/>
                    <input className="m-2 p-2 bg-black text-white rounded-md" type="submit" value={"submit"} />`    z`
                </form>
            </div>
            </div>
        </>
    )
}

export default Login