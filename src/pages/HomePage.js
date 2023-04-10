import './HomePage.css';
import axios from 'axios';
import { useAuth } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useContext } from "react";
import TaskCard from '../components/TaskCard';
import CreateProjectPage from './CreateProjectPage';
const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

const HomePage = () => {
    const [currentUserProjects, setCurrentUserProjects] = useState(null);
    const [currentUser, setCurrentUser] = useState('');
    const [projectIsBeingCreated, setProjectIsBeingCreated] = useState(false);
    const [dashboardUrl, setDashboardUrl] = useState('/homepage');
    const [users, setUsers] = useState('');
    const [projects, setProjects] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const createProject = (projectName, description, date, assignedUsers) => {
        setProjectIsBeingCreated(true);
        setDashboardUrl(`/homepage/${projectName}`);
        navigate(`/homepage/${projectName}`);
        const req = {
            projectName: projectName,
            description: description,
            dueDate: date,
            assignedUsers: assignedUsers
        }
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        try {
            axios.post(`${urlEndPoint}/projects/createProject/${currentUser._id}`, req , {headers:headers})
                .then(res => {
                    console.log(res);
                })
        } catch (e) {
            console.log(e);
        }
        setProjectIsBeingCreated(false);
    }

    const getUsers = () => {
        try {
            axios.get(`${urlEndPoint}/users/all`)
                .then((res) => {
                    setUsers(res.data.users);
                    return res;
                })
                .then(res => {
                    for(const user of res.data.users){
                        if(user.email === auth.userEmail){
                            setCurrentUser(user);
                            axios.get(`${urlEndPoint}/projects/userProjects/${user._id}`)
                                .then(res => {
                                    if(res.data.userProjects[0] !== undefined){
                                        setCurrentUserProjects(res.data.userProjects);
                                    }
                        })
                        }
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            {currentUserProjects !== null && <h3 id='project'>{'Project: ' + currentUserProjects[0].projectName}</h3>}
            {currentUserProjects === null && <a onClick={(e) => {
                e.preventDefault();
                navigate('/homepage/createProject');
                setProjectIsBeingCreated(true);
                }} id='create-project' className='nav-link' href='/homepage/createProject'>Create Project</a>}
            {projectIsBeingCreated && <CreateProjectPage 
                                            createProject={createProject}/>}
            <ul id='navbar' className="nav nav-tabs justify-content-end">
                <li className="nav-item">
                    <a className="nav-link " aria-current="page" onClick={() => navigate(dashboardUrl)}>Dashboard</a>
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