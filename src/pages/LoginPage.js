import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import './LoginRegistrationPage.css'

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const auth = useAuth(); 
	const navigate = useNavigate() 
    return (
        <div id="outer-container">
            <div className="outer-divs">
                <div className="outer-inner-divs">
                    <img className="images" src={process.env.PUBLIC_URL + "/LoginRegistrationPic2.png"} alt="Something went wrong"/>
                </div>
            </div>
            <div id="inner-container" className="shadow-lg p-3 mb-5 bg-white rounded">
                <p id="login-header" className="h1">Login to PM</p>
                {loginMessage && <div className="alert alert-danger" role="alert">
                    {loginMessage}
                </div>}
                <div className="input-div">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                        }}/>
                    </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary"
                        onClick={async () => {
                            const loginResult = await auth.login(email, password);
                                if (loginResult.success) {
                                    navigate("/homepage")
                                }
                                if (!loginResult.success) {
                                    setLoginMessage(loginResult.message)
                                }
                        }}
                    >Login
                    </button>
                </div>
                <div id="link">
                    <a href="/registration" className="link-primary">Sign up for an account</a>
                </div>
            </div>
            <div className="outer-divs">
                <div className="outer-inner-divs">
                    <img className="images" src={process.env.PUBLIC_URL + "/LoginRegistrationPic1.png"} alt="Something went wrong"/>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;