import './HomePage.css';
import axios from 'axios';
import { useAuth } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useContext } from "react";
import TaskCard from '../components/TaskCard';
import CreateProject from '../components/CreateProject';
import CreateTask from '../components/CreateTask';
import TaskPage from './TaskPage';
const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

const HomePage = () => {
    const [currentUserProjects, setCurrentUserProjects] = useState(null);
    const [currentUser, setCurrentUser] = useState('');
    const [projectIsBeingCreated, setProjectIsBeingCreated] = useState(false);
    const [taskIsBeingCreated, setTaskIsBeingCreated] = useState(false);
    const [dashboardUrl, setDashboardUrl] = useState('/homepage');
    const [currentProjectTasks, setCurrentProjetTasks] = useState([]);
    const [users, setUsers] = useState('');
    const [todoTask, setTodoTask] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [inReview, setInReview] = useState([]);
    const [complete, setComplete] = useState([]);
    const [viewingTask, setViewingTask] = useState(false);
    const [viewingTaskInfo, setViewingTaskInfo] = useState('');
    const [dataLoading, setDataLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();

    const viewTask = (task) => {
        setViewingTask(true);
        setViewingTaskInfo(task);

    }

    const viewTask2 = () => {
        setViewingTask(false);
        navigate(dashboardUrl);
    }
    
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

    const createTask = (taskName, description, date, assignedUsers) => {
        setTaskIsBeingCreated(true);
        const req = {
            taskName: taskName,
            description: description,
            dueDate: date,
            assignedUsers: assignedUsers
        }
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        try {
            axios.post(`${urlEndPoint}/projects/createTask/${currentUserProjects[0]._id}/${currentUser._id}`, req , {headers:headers})
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
        } catch (e) {
            console.log(e);
        }
        setTaskIsBeingCreated(false)
        navigate(dashboardUrl);
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
                                        setCurrentProjetTasks(res.data.userProjects[0].task);
                                        const todo = [];
                                        const inProgress = [];
                                        const inReview = [];
                                        const complete = [];
                                        for(let i = 0; i < res.data.userProjects.length; i++){
                                            for(let j = 0; j < res.data.userProjects[i].task.length; j++){
                                                if(res.data.userProjects[i].task[j].status === 'not-started'){
                                                    todo.push(res.data.userProjects[i].task[j]);
                                                }
                                                if(res.data.userProjects[i].task[j].status === 'in-progress'){
                                                    inProgress.push(res.data.userProjects[i].task[j]);
                                                }
                                                if(res.data.userProjects[i].task[j].status === 'in-review'){
                                                    inReview.push(res.data.userProjects[i].task[j]);
                                                }
                                                if(res.data.userProjects[i].task[j].status === 'completed'){
                                                    complete.push(res.data.userProjects[i].task[j]);
                                                }
                                            }
                                        }
                                        setTodoTask(todo);
                                        setInProgress(inProgress);
                                        setInReview(inReview);
                                        setComplete(complete);
                                        setDashboardUrl(`/homepage/${res.data.userProjects[0].projectName}`);
                                        navigate(`/homepage/${res.data.userProjects[0].projectName}`);
                                    }
                        })
                        }
                    }
                    setDataLoading(false);
                })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUsers();
    }, [dataLoading])

    if(dataLoading) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    } else {
    return (
        <div>
            {currentUserProjects !== null && <h3 id='project'>{'Project: ' + currentUserProjects[0].projectName}</h3>}
            {currentUserProjects === null && <a onClick={(e) => {
                e.preventDefault();
                navigate('/homepage/createProject');
                setProjectIsBeingCreated(true);
                }} id='create-project' className='nav-link' href='/homepage/createProject'>Create Project</a>}
            {projectIsBeingCreated && <CreateProject 
                                            createProject={createProject}/>}
            {taskIsBeingCreated && <CreateTask 
                                            createTask={createTask}/>}
            {viewingTask && <TaskPage 
                                    task={viewingTaskInfo} viewTask={viewTask2} users={users} currentUserProjects={currentUserProjects} />}
            <ul id='navbar' className="nav nav-tabs justify-content-end">
                <li className="nav-item">
                    <a className="nav-link " aria-current="page" onClick={() => navigate(dashboardUrl)}>Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">My Tasks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={(e) => {
                        e.preventDefault();
                        navigate('/homepage/createTask');
                        setTaskIsBeingCreated(true);
                    }}>Create Task</a>
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
                <div className='card-container shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">To-do</p>
                    </div>
                    <div className='cards'>
                        <TaskCard tasks={todoTask} users={users} viewTask={viewTask}/>
                    </div>
                </div>
                <div className='card-container shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">In-progress</p>
                    </div>
                    <div className='cards'>
                        <TaskCard tasks={inProgress} users={users} viewTask={viewTask}/>
                    </div>
                </div>
                <div className='card-container shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">Review</p>
                    </div>
                    <div className='cards'>
                        <TaskCard tasks={inReview} users={users} viewTask={viewTask}/>
                    </div>    
                </div>
                <div className='card-container shadow-lg mb-5 bg-white rounded'>
                    <div className='header'>
                        <p className="h4">Complete</p>
                    </div>
                    <div className='cards'>
                        <TaskCard tasks={complete} users={users} viewTask={viewTask}/>
                    </div>
                </div>
            </div>
        </div>  
    )
    }
}

export default HomePage;