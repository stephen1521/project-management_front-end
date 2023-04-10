import './CreateProjectPage.css';
import { useState, useEffect } from "react";

const CreateProjectPage = (props) => {
    const { createProject } = props;
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    return (
        <div id="create-project-container">
            <div id='create-project-page'>
                <h1>Create Project</h1>
                <div className='input-div'>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-describedby="inputGroup-sizing-default" placeholder="Enter Project Name"
                            onChange={(e) => {
                                setProjectName(e.target.value);
                            }}/>
                    </div>
                    <div className="input-group mb-3">
                        <textarea className="form-control" aria-describedby="inputGroup-sizing-default" placeholder="Description"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Due Date</span>
                        <input type="date" className="form-control" aria-describedby="inputGroup-sizing-default" placeholder='Due Date'
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}/>
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Add Users</span>
                        <input type="text" className="form-control" aria-describedby="inputGroup-sizing-default" placeholder="Enter User Name/s"
                            onChange={(e) => {
                                setAssignedUsers(e.target.value);
                            }}/>
                    </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary"
                        onClick={async () => {
                                createProject(projectName, description, date, assignedUsers);
                            }}
                    >Create Project
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectPage;