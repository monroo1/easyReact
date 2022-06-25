import React, { useEffect, useContext } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";
import TaskBlockItem from "../task-block-item/TaskBlockItem";

const TasksList = ({ tasks }) => {
  const { tasksList, setTasksList } = useContext(StatusContext);

  useEffect(() => {
    const getTasks = tasks
      .filter((item) => item.id > 1)
      .map((item) => {
        const link = `https://test.easy-task.ru/api/v1/tasks/${item.id}`;
        console.log(item.id);
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
  }, []);

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
