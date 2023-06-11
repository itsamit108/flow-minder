import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ taskList, viewCompleted, handleToggleComplete, editItem, handleDelete }) => {
    const renderItems = () => {
        const filteredItems = taskList.filter(item => item.completed === viewCompleted);

        if (filteredItems.length === 0) {
            return (
                <li className="list-group-item d-flex justify-content-center align-items-center">
                    No tasks
                </li>
            );
        }

        return filteredItems.map(item => (
            <TaskItem
                key={item.id}
                item={item}
                handleToggleComplete={handleToggleComplete}
                editItem={editItem}
                handleDelete={handleDelete}
            />
        ));
    };

    return <ul className="list-group list-group-flush">{renderItems()}</ul>;
};

export default TaskList;
