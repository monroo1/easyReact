import React from "react";
import TaskBlockItem from "../task-block-item/TaskBlockItem";

const TasksList = () => {
  return (
    <div className="dependencies">
      <div className="dependencies__content">
        <div className="dependencies__content-list">
          <TaskBlockItem />
          <TaskBlockItem />
        </div>
      </div>
    </div>
  );
};

export default TasksList;
