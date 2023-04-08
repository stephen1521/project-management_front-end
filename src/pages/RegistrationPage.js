import { useState } from "react";
import { useAuth } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <div id="outer-container">
            <div className="outer-divs">
                <div className="outer-inner-divs">
                    <img className="images" src={process.env.PUBLIC_URL + "/LoginRegistrationPic2.png"} alt="Something went wrong"/>
                </div>
            </div>
            <div id="inner-container" className="shadow-lg p-3 mb-5 bg-white rounded">
                <p id="login-header" className="h1">Register new account</p>
                {registerMessage && <div className="alert alert-danger" role="alert">
                    {registerMessage}
                </div>}
                <div className="input-div">
                <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                        }}/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                        }}/>
                    </div>
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
                                const registerResult = await auth.register(email, password, firstName, lastName);
                                if(registerResult.success) {
                         			navigate("/login");
                                }
                                if(!registerResult.success) {
                                    setRegisterMessage(registerResult.message);
                                }
                        }}
                    >Register
                    </button>
                </div>
                <div id="link">
                    <a href="/login" className="link-primary">Already have an account? Log in</a>
                </div>
            </div>
            <div className="outer-divs">
                <div className="outer-inner-divs">
                    <img className="images" src={process.env.PUBLIC_URL + "/LoginRegistrationPic1.png"} alt="Something went wrong"/>
                </div>
            </div>
        </div>
    )
};

export default RegistrationPage;