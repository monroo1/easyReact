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
    apiBp,
  } = useContext(StatusContext);

  useEffect(() => {
    if (!start) {
      const getTasks = tasks.map((item) => {
        const link = `https://test.easy-task.ru/api/v1/tasks/${item.original_id}`;
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

  // useEffect(() => {
  //   if (tasksList.length > 0) {
  //     const updateStatus = tasksList.map((item, i) => {
  //       let status;
  //       if (item.data.data.status_id === 18) {
  //         status = 0;
  //       } else if (item.data.data.status_id === 19) {
  //         status = 1;
  //       } else if (item.data.data.status_id === 11) {
  //         status = 2;
  //       } else if (item.data.data.status_id === 15) {
  //         status = 3;
  //       } else if (item.data.data.status_id === 3) {
  //         status = 4;
  //       } else if (item.data.data.status_id === 2) {
  //         status = 5;
  //       } else if (item.data.data.status_id === 14) {
  //         status = 6;
  //       } else if (item.data.data.status_id === 10) {
  //         status = 7;
  //       } else if (item.data.data.status_id === 13) {
  //         status = 8;
  //       }
  //       const link = `${apiBp}/task/${tasks[i].id}?status=${status}`;
  //       return axios.patch(
  //         link,
  //         {},
  //         {
  //           headers: {
  //             "secret-token": document.cookie.replace(
  //               /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
  //               "$1"
  //             ),
  //           },
  //         }
  //       );
  //     });

  //     Promise.all(updateStatus);
  //   }
  // }, [tasksList]);

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
