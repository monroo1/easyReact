import React, { useContext, useRef } from "react";
import { StatusContext } from "../../context/status";
import TaskItem from "../task-item/TaskItem";

const TaskBlockItem = ({ item }) => {
  const { tasksList } = useContext(StatusContext);

  return (
    <div className="dependencies__content-list__task-block">
      <TaskItem el={item} />
      <div className="dependencies__content-list__task-block__vertical-line">
        <div></div>
      </div>
      <div className="dependencies__content-list__task-block__gorizont-wrapper">
        <div
          className="dependencies__content-list__task-block__gorizont"
          id="dependencies-block-drow-el.id"
        >
          {item.child_tasks.length > 0 ? (
            item.child_tasks.map((it) => {
              const arr = tasksList.filter((i) => {
                return i.data.data.id === it;
              });
              return (
                <div
                  className="dependencies__content-list__task-block"
                  key={it}
                >
                  <TaskItem el={arr[0].data.data} style={"dropdown"} />
                  <div className="dependencies__content-list__task-block__vertical-line">
                    <div></div>
                  </div>
                  <div className="dependencies__content-list__task-block__gorizont-wrapper">
                    <div
                      className="dependencies__content-list__task-block__gorizont"
                      id="dependencies-block-drow-el.id"
                    >
                      {arr[0].data.data.child_tasks.length > 0 ? (
                        arr[0].data.data.child_tasks.map((it) => {
                          const arr = tasksList.filter((i) => {
                            return i.data.data.id === it;
                          });
                          return (
                            <div
                              className="dependencies__content-list__task-block"
                              key={it}
                            >
                              <TaskItem
                                el={arr[0].data.data}
                                style={"dropdown"}
                              />
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
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBlockItem;
