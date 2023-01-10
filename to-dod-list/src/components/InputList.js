import React, { useState, useEffect } from "react";

export default function InputList() {
    const [taskName, setTaskName] = useState("");
    const [status, setStatus] = useState("In progress");
    const [listTask, setListTask] = useState([]);
    const [taskId, setTaskId] = useState(listTask.length);
    const handleAdd = () => {
        setListTask([
            ...listTask,
            { taskName: taskName, status: status, id: listTask.length },
        ]);
        setTaskName("");
    };
    useEffect(() => {
      let listTaskLocal = JSON.parse(localStorage.getItem("listTask"));
      if (listTaskLocal == null) {
        listTaskLocal = [];
        localStorage.setItem("listTask", JSON.stringify(listTaskLocal));
      } else {
        setListTask(listTaskLocal);
      }
    }, []);
    useEffect(() => {
      localStorage.setItem("listTask", JSON.stringify(listTask))}
    ,[listTask]);
    const handleChange = (e, id)=> {
        let dataEdit = listTask.map(task => {
            if (task.id == id) {
                return {...task,taskName: e};
            } else {
                return task;
            }
        })
        setListTask(dataEdit);
    }
    const toogleInput = (id)=> {
        document.getElementById(`input${id}`).removeAttribute("disabled");
    }
    const keyCode = (e,id)=> {
        if (e.keyCode == 13){
            document.getElementById(`input${id}`).setAttribute("disabled","");
        }
    }
  let elementTableList = listTask.map((task, index) => {
    return (
      <tr key={task.id}>
        <td>{index + 1}</td>
        <td>
          <input key={"task"+task.id} type={"text"} value={task.taskName} onKeyDown={(e,id)=>keyCode(e,task.id)} onChange={(e,id)=>handleChange(e.target.value,task.id)} id={"input"+task.id} disabled></input>
        </td>
        <td>{task.status}</td>
        <td>
          <button onClick={(id)=>toogleInput(task.id)}>Edit</button>
        </td>
        <td>
          <button>Delete</button>
        </td>
        <td>
          <button>Finish</button>
        </td>
      </tr>
    );
});
  return (
    <div className="InputList">
      <label>Name of task:</label>
      <input
        type={"text"}
        name="taskName"
        placeholder="Write your task's name here"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
      <button onClick={handleAdd}>Add</button>
      <br />
      <table className="tableList">
        <thead>
          <tr>
            <th>No.</th>
            <th>Task's Name</th>
            <th>Status</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>{elementTableList}</tbody>
      </table>
    </div>
  );
}
