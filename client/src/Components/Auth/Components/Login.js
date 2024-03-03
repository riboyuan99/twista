import { useState } from "react";
import style from "../Auth.module.css"
import email_icon from "../../../Assets/email.png"
import password_icon from "../../../Assets/password.png"
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate} from "react-router-dom"


const Login = () => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const handleInputChange = (e) => {
        const {name, value} = e.target
        switch(name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    // Firebase set-up
    const firebaseConfig = {
        apiKey: "AIzaSyBcsHc08myNQJBIDDOzr6mbzwQv4azS4nk",
        authDomain: "twista-81fa4.firebaseapp.com",
        projectId: "twista-81fa4",
        storageBucket: "twista-81fa4.appspot.com",
        messagingSenderId: "110671924261",
        appId: "1:110671924261:web:a70cf822b0027ba8ff43cc",
        measurementId: "G-JRH7MS449E"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const navigate = useNavigate();
    const logInWithEmailAndPassword = async () => {
        if (email === "" || password === ""){
            alert("Missing information")
        }else{
            try {
                console.log(email, password)
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                navigate(`/${userCredential.user.uid}/projects`)
                // Todo: jump to project dashboard
            } catch (err) {
                console.error(err);
                alert(err.message);
            }

        }

    };





    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.text}>Log in</div>
                <div className={style.underline}></div>
            </div>

            <div className={style.inputs}>
                <div className={style.input}>
                    <img src={email_icon}/>
                    <input type="email" placeholder='Email' name="email" value={email} onChange={handleInputChange}/>
                </div>
                <div className={style.input}>
                    <img src={password_icon}/>
                    <input type="password" placeholder='Passowrd' name="password" value={password} onChange={handleInputChange}/>
                </div>
            </div>

            <div className={style.submitcontainer}>
                <div className={style.submit} onClick={logInWithEmailAndPassword}>Log in</div>
            </div>
        </div>
    )
}

export default Login