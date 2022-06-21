import React, { useEffect, useContext } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";
import TaskBlockItem from "../task-block-item/TaskBlockItem";

const TasksList = ({ tasks, projectId }) => {
  const { tasksList, setTasksList } = useContext(StatusContext);

  useEffect(() => {
    const getTasks = tasks.map((item) => {
      const link = `https://test.easy-task.ru/api/v1/tasks/${item.id}`;
      return axios.get(link, {
        params: { project_id: projectId },
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
  }, []);

  console.log(tasksList);

  return (
    <div className="dependencies">
      <div className="dependencies__content">
        <div className="dependencies__content-list">
          {tasksList
            .filter((item) => item.data.data.parent_id === null)
            .map((el) => {
              return (
                <TaskBlockItem item={el.data.data} key={el.data.data.id} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TasksList;
