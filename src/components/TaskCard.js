import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const navigate = useNavigate();
    const {task, users, viewTask} = props;
    let filteredData = '';
    for(const i of task.assignedUsers){
        for(const user of users){
            if(user._id === i){
                filteredData += user.name + ' ';
            }
        }
    }

    return (
        <div className="card" style={{width: '95%', marginTop: '10px', position: 'static'}}>
            <div onClick={() => {
                    navigate(`/homepage/task/${task.taskName}`)
                    viewTask(task);
                }
                } className="card-header">
                Title:{' ' +task.taskName}
            </div>
            <div className="card-body">
                Assigned to:{' ' + filteredData}
            </div>
        </div>
    )
}

const TaskCard = (props) => {
    const { tasks, users, viewTask } = props;
    if(tasks.length > 0){
        const cards = tasks.map((task, index) => {
            return (
                <Card key={index} task={task} users={users} viewTask={viewTask}/>
            )
        })
        return (
            <div>
                {cards}
            </div>
        )
    }
}

export default TaskCard;