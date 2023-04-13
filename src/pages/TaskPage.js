import { useState } from "react";
import './taskPage.css';
import axios from 'axios';
const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

const Task = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const {task, viewTask, users, currentProject} = props;
    const [selectedOption, setSelectedOption] = useState(task.status);
    const [taskName, setTaskName] = useState(task.taskName);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate.substring(0,10));
    const [status, setStatus] = useState(task.status);
    const date = task.dueDate.substring(0,10);
    let filteredData = '';
    let name = '';
    for(const i of task.assignedUsers){
        for(const user of users){
            if(user._id === i){
                filteredData += user.name + ', ';
            }
            if(user._id === task.createdBy){
                name = user.name;
            }
        }
    }
    filteredData = filteredData.substring(0, (filteredData.length - 2))
    const [assignedUsers, setAssignedUsers] = useState(filteredData);
    const handleUpdateTask = async () => {
        const req = {
            taskName: taskName,
            description: description,
            assignedUsers: assignedUsers,
            dueDate: dueDate,
            status: status
        }
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        await axios.put(`${urlEndPoint}/projects/updateTask/${currentProject._id}/${task._id}`, req, {headers:headers})
            .then(function (response){
                console.log(response);
                window.location.reload();
        }).catch(function (e){
            console.log(e);
        })
    }

    const handleDeleteTask = async () => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        await axios.delete(`${urlEndPoint}/projects/deleteTask/${currentProject._id}/${task._id}`, {headers:headers})
            .then(function (response){
                console.log(response);
                window.location.reload();
        }).catch(function (e){
            console.log(e);
        })
    }

    if(isEditing){
        return (
            <div id="task-container">
                <div id="task">
                    <h3>Edit Task</h3>
                    <div className="input-div">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Task name:</span>
                            <input type="text" className="form-control" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Description:</span>
                            <textarea type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Assigned users:</span>
                            <input type="text" className="form-control" value={assignedUsers} onChange={e => setAssignedUsers(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Due date:</span>
                            <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)}/>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value="not-started" 
                                                    checked={selectedOption === 'not-started'}
                                                    onChange={(e) => {
                                                        setSelectedOption('not-started');
                                                        setStatus(e.target.value);
                                                    }}/>
                            <label className="form-check-label">
                                Not-started
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value="in-progress" 
                                                    checked={selectedOption === 'in-progress'}
                                                    onChange={(e) => {
                                                        setSelectedOption('in-progress');
                                                        setStatus(e.target.value);
                                                    }}/>
                            <label className="form-check-label">
                                In-progress
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value="in-review" 
                                                    checked={selectedOption === 'in-review'}
                                                    onChange={(e) => {
                                                        setSelectedOption('in-review');
                                                        setStatus(e.target.value);
                                                    }}/>
                            <label className="form-check-label">
                                In-review
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value="completed" 
                                                    checked={selectedOption === 'completed'}
                                                    onChange={(e) => {
                                                        setSelectedOption('completed');
                                                        setStatus(e.target.value);
                                                    }}/>
                            <label className="form-check-label">
                                Complete
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-secondary me-3" onClick={() => {
                                                                        handleUpdateTask();
                                                                        setIsEditing(false);
                                                                    }}>Submit</button>
                        <button className="btn btn-secondary" onClick={() => {
                                                                        handleDeleteTask();
                                                                        setIsEditing(false);    
                                                                    }}>Back</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div id="task-container">
                <div id="task">
                    <p>Task name:{' ' + task.taskName}</p>
                    <p>Created by:{' ' + name}</p>
                    <p>Due date:{' ' + date}</p>
                    <p>Description:{' ' + task.description}</p>
                    <p>Status:{' ' + task.status}</p>
                    <p>Assigned Users:{' ' + filteredData}</p>
                    <div>
                        <button className="btn btn-secondary me-3" onClick={() => {
                                                                        setIsEditing(true)
                                                                    }}>
                            Edit Task
                        </button>
                        <button className="btn btn-secondary me-3" onClick={() => {
                                                                        handleDeleteTask()
                                                                    }}>
                            Delete Task
                        </button>
                        <button className="btn btn-secondary me-3" onClick={() => viewTask()}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;