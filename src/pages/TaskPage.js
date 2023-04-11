import { useState } from "react";
import './taskPage.css';

const Task = (props) => {
    const {task, viewTask, users} = props;
    let filteredData = '';
    let name = '';
    for(const i of task.assignedUsers){
        for(const user of users){
            if(user._id === i){
                filteredData += user.name + ' ';
            }
            if(user._id === task.createdBy){
                name = user.name;
            }
        }
    }
    return (
        <div id="task-container">
            <div id="task">
                <p>Task name:{' ' + task.taskName}</p>
                <p>Created by:{' ' + name}</p>
                <p>Due date:{' ' + task.dueDate}</p>
                <p>Description:{' ' + task.description}</p>
                <p>Status:{' ' + task.status}</p>
                <p>Assigned Users:{' ' + filteredData}</p>
                <button className="btn btn-secondary" onClick={() => viewTask()}>back</button>
            </div>
        </div>
    )
}

export default Task;