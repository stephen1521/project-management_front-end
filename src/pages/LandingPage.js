import './LandingPage.css'
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div id="navBar-Container">
                <NavBar id="NavBar"/>
            </div>
            <div id="bg" style={{backgroundImage: "url(/landingPageBg.jpg)" }}>
                <div id='Container'>
                    <div id='message' className='Container-Child'>
                        <h1 className='text'>Bring all your teammates and tasks together.</h1>
                        <h5 className='text'>Keep everything together even if your team isn't.</h5>
                        <button id="button"className='btn btn-primary btn-lg' onClick={() => navigate('/registration')}>Sign Up-Today</button>
                    </div>
                    <div className='Container-Child'>
                        <img id="image"src={process.env.PUBLIC_URL + "/landingPageImage.png"} alt="Something didnt work" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;