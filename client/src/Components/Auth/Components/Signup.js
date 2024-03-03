
import style from "../Auth.module.css"
import user_icon from "../../../Assets/person.png"
import email_icon from "../../../Assets/email.png"
import password_icon from "../../../Assets/password.png"
import { useState } from "react"


const Signup = () => {
    const nodejsServer = "http://127.0.0.1:8080"
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleInputChange = (e) => {
        const {name, value} = e.target
        switch(name){
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        //Check if name, email, password is filled.
        if (name === "" || email === "" || password === ""){
            alert("Please fill in the required information")
        }else{
            // Submit to nodejs backend
            try {
                const response = await fetch(nodejsServer+'/auth/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userName:name, userEmail:email, userPassword:password}),
                });
                
                const responseData = await response.json()
                if (responseData.error){
                    alert(responseData.error.message);
                }else{
                    //Todo: jump to project dashboard
                    alert("success")
                }
              } catch (error) {
                console.error('Error sending message:', error);
              }
        }
    }


    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.text}>Sign Up</div>
                <div className={style.underline}></div>
            </div>

            <div className={style.inputs}>
                <div className={style.input}>
                    <img src={user_icon}/>
                    <input type="text" placeholder='Name' value={name} name="name" onChange={handleInputChange}/>
                </div>
                <div className={style.input}>
                    <img src={email_icon}/>
                    <input type="email" placeholder='Email' value={email} name="email" onChange={handleInputChange}/>
                </div>
                <div className={style.input}>
                    <img src={password_icon}/>
                    <input type="password" placeholder='Passowrd' value={password} name="password" onChange={handleInputChange}/>
                </div>
            </div>

            <div className={style.submitcontainer}>
                <div className={style.submit} onClick={handleSumbit}>Sign Up</div>
            </div>
        </div>
    )
}

export default Signup