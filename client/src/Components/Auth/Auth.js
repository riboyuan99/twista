import style from "./Auth.module.css"
import { Link } from "react-router-dom"
const Auth = () => {
    return (
        <div className={style.centered}>
            <div className={style.submitcontainer}>
                <Link to="/auth/signup" style={{ textDecoration:'none' }}>
                    <div className={style.submit}>Sign Up</div>
                </Link>
                <Link to="/auth/login" style={{ textDecoration:'none' }}>
                    <div className={style.submit}>Log in</div>
                </Link>
            </div>
        </div>


    )
}

export default Auth