import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { StatusContext } from "../../context/status";
import TaskItem from "../task-item/TaskItem";

const TaskBlockItem = ({ item }) => {
  const { tasksList } = useContext(StatusContext);
  const getTopChildBlock = useRef();
  const getTopParentBlock = useRef();
  const [styleLine, setStyleLine] = useState(false);

  useEffect(() => {
    if (!!getTopChildBlock.current) {
      setStyleLine(true);
    }
  }, []);

  return (
    <div
      className="dependencies__content-list__task-block"
      ref={getTopParentBlock}
    >
      <TaskItem el={item} />
      <div className="dependencies__content-list__task-block__vertical-line">
        <div
          style={
            !!styleLine
              ? {
                  height:
                    getTopChildBlock.current.offsetTop -
                    getTopParentBlock.current.offsetTop -
                    47 +
                    "px",
                }
              : {}
          }
        ></div>
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
                  ref={getTopChildBlock}
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
