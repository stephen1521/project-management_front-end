import { useAuth } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <div>HomePage
            <button onClick={()=> {
                auth.logout()
                navigate('/')}}>Logout</button>
        </div>  
    )
}

export default HomePage;