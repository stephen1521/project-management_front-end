import './HomePage.css';
import { useAuth } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from '../components/TaskCard';


const HomePage = () => {
    const [project, setProject] = useState('some name');
    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <div>
            {project !== null && <h3 id='project'>{'Project: '+project}</h3>}
            {project === null && <a id='create-project' className='nav-link' href='/login'>Create Project</a>}
            <ul id='navbar' className="nav nav-tabs justify-content-end">
                <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="/homepage">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">My Tasks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Create Task</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Profile</a>
                </li>
                <button className="btn btn-outline-secondary" type="submit" 
                    onClick={()=> {
                        auth.logout()
                        navigate('/')}}>Logout</button>
            </ul>
            <div id="dashboard-container">
                <div id="card-container" className='shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">To-do</p>
                    </div>
                    <div className='cards'>
                        <TaskCard />
                    </div>
                </div>
                <div id="card-container" className='shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">In-progress</p>
                    </div>
                    <div className='cards'>
                        <TaskCard />
                    </div>
                </div>
                <div id="card-container" className='shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">Review</p>
                    </div>
                    <div className='cards'>
                        <TaskCard />
                    </div>    
                </div>
                <div id="card-container" className='shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">Complete</p>
                    </div>
                    <div className='cards'>
                        <TaskCard />
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default HomePage;