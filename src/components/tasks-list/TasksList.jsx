import React, { useEffect, useContext } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";
import TaskBlockItem from "../task-block-item/TaskBlockItem";

const TasksList = ({ tasks, parent }) => {
  const {
    tasksList,
    setTasksList,
    start,
    openMenuTasks,
    openMenuBp,
    createTaskStatus,
    createBpSampleStatus,
    createBpStatus,
  } = useContext(StatusContext);

  useEffect(() => {
    if (!start) {
      const getTasks = tasks.map((item) => {
        const link = `https://test.easy-task.ru/api/v1/tasks/${item.id}`;
        return axios.get(link, {
          headers: {
            Authorization:
              "Bearer " +
              document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
          },
        });
      });

      Promise.all(getTasks).then((results) => setTasksList(results));
    }
  }, []);

  if (tasksList.length > 0) {
    return (
      <div
        className="dependencies"
        style={
          openMenuTasks ||
          openMenuBp ||
          createTaskStatus ||
          createBpSampleStatus ||
          createBpStatus
            ? { paddingLeft: 88 + "px" }
            : {}
        }
      >
        <div className="dependencies__content">
          <div className="dependencies__content-list">
            {tasksList
              .filter((item) => item.data.data.parent_id === null)
              .map((el) => {
                return (
                  <TaskBlockItem
                    item={el.data.data}
                    key={el.data.data.id}
                    parentId={parent}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
};

export default TasksList;
