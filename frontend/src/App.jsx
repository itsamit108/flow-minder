import axios from 'axios';
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";

const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false
  });
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get("https://flow-minder.onrender.com/api/tasks/")
      .then(res => setTaskList(res.data))
      .catch(err => console.log(err));
  };

  const displayCompleted = status => {
    setViewCompleted(status);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = item => {
    toggle();
    if (item.id) {
      axios
        .put(`https://flow-minder.onrender.com/api/tasks/${item.id}/`, item)
        .then(res => refreshList());
      return;
    }
    axios
      .post("https://flow-minder.onrender.com/api/tasks/", item)
      .then(res => refreshList());
  };

  const handleDelete = item => {
    axios
      .delete(`https://flow-minder.onrender.com/api/tasks/${item.id}/`)
      .then(res => refreshList());
  };

  const handleToggleComplete = item => {
    const updatedTaskList = taskList.map(task => {
      if (task.id === item.id) {
        const updatedTask = { ...task, completed: !task.completed };
        axios
          .put(`https://flow-minder.onrender.com/api/tasks/${item.id}/`, updatedTask)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
        return updatedTask;
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    setModal(!modal);
  };

  const editItem = item => {
    setActiveItem(item);
    setModal(!modal);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <>
      <Navbar />
      <main className="content" style={{ marginBottom: "25%" }}>
        <h1 className="text-white text-uppercase text-center my-4">Your Tasks</h1>
        <p className="text-center fs-4 text-white">{currentDate}</p>
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-10 p-0">
            <div className="card p-3">
              <div className="d-flex justify-content-center mb-3">
                <button onClick={createItem} className="btn btn-primary">
                  Add Task
                </button>
              </div>
              <div className="my-3 tab-list d-flex justify-content-center">
                <span
                  onClick={() => displayCompleted(true)}
                  className={"me-2" + (viewCompleted ? " active" : "")}
                >
                  Completed
                </span>
                <span
                  onClick={() => displayCompleted(false)}
                  className={"ms-2" + (viewCompleted ? "" : " active")}
                >
                  Pending
                </span>
              </div>
              <TaskList
                taskList={taskList}
                viewCompleted={viewCompleted}
                handleToggleComplete={handleToggleComplete}
                editItem={editItem}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
        {modal ? (
          <Modal
            activeItem={activeItem}
            toggle={toggle}
            onSave={handleSubmit}
          />
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default App;
