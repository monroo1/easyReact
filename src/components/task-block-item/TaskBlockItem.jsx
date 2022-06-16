import React from "react";
import TaskItem from "../task-item/TaskItem";

const TaskBlockItem = () => {
  return (
    <div className="dependencies__content-list__task-block">
      <TaskItem />
      <div className="dependencies__content-list__task-block__vertical-line">
        <div></div>
      </div>
      <div className="dependencies__content-list__task-block__gorizont-wrapper">
        <div
          className="dependencies__content-list__task-block__gorizont"
          id="dependencies-block-drow-el.id"
        >
          <div className="dependencies__content-list__task-block">
            <TaskItem style={"dropdown"} />
            <div className="dependencies__content-list__task-block__vertical-line">
              <div></div>
            </div>
            <div className="dependencies__content-list__task-block__gorizont-wrapper">
              <div
                className="dependencies__content-list__task-block__gorizont"
                id="dependencies-block-drow-el.id"
              >
                <div className="dependencies__content-list__task-block">
                  <TaskItem style={"dropdown"} />
                  <div className="dependencies__content-list__task-block__vertical-line">
                    <div></div>
                  </div>
                  <div className="dependencies__content-list__task-block__gorizont-wrapper">
                    <div
                      className="dependencies__content-list__task-block__gorizont"
                      id="dependencies-block-drow-el.id"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dependencies__content-list__task-block">
            <TaskItem style={"dropdown"} />
            <div className="dependencies__content-list__task-block__vertical-line">
              <div></div>
            </div>
            <div className="dependencies__content-list__task-block__gorizont-wrapper">
              <div
                className="dependencies__content-list__task-block__gorizont"
                id="dependencies-block-drow-el.id"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBlockItem;
