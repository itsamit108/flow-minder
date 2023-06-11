import React from "react";

const TaskItem = ({ item, handleToggleComplete, editItem, handleDelete }) => {
    const handleToggle = () => {
        handleToggleComplete(item);
    };

    const handleEdit = () => {
        editItem(item);
    };

    const handleDeleteTask = () => {
        handleDelete(item);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item.completed}
                        onChange={handleToggle}
                        style={{ transform: "scale(1.5)" }}
                    />
                    <label
                        className={`form-check-label todo-title mb-1 ${item.completed ? "completed-todo" : ""} text-dark`}
                        title={item.description}
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                        {item.title}
                    </label>
                </div>
                <p className="todo-description mb-0 text-muted">{item.description}</p>
            </div>
            <div className="d-flex align-items-center">
                <div className="mr-2">
                    <button onClick={handleEdit} className="btn btn-secondary mx-2">
                        Edit
                    </button>
                </div>
                <div>
                    <button onClick={handleDeleteTask} className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
};

export default TaskItem;
