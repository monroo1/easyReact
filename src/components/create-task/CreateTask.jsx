import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";
import CreateTaskForm from "../create-task-form/CreateTaskForm";

const CreateTask = () => {
  const {
    nowBp,
    setNowBp,
    createTaskForm,
    setCreateTaskForm,
    createBpForm,
    setCreateTaskStatus,
  } = useContext(StatusContext);
  const [addTask, setAddTask] = useState();

  const saveTask = () => {
    fetch("https://test.easy-task.ru/api/v1/tasks", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        "company-id": 1,
      },
      body: JSON.stringify(createTaskForm),
    })
      .then((resesult) => resesult.json())
      .then((res) => {
        fetch(
          `https://69abc97a149040.lhrtunnel.link/api/v1/businessProcess/${nowBp.id}?tasks=${nowBp.tasks}${res.data.id}`,
          {
            method: "PATCH",
            headers: {
              secret_token: document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            console.log(r);
            let taskss = "";
            for (let i of r.tasks) {
              taskss = taskss.concat(i.id + "|");
            }
            console.log(taskss);
            setNowBp({
              id: r.businessProcess.id,
              tasks: taskss,
            });
          });
      });
  };

  useEffect(() => {
    if (createTaskForm.name !== null) {
      setAddTask(true);
    } else {
      setAddTask(false);
    }
  }, [createTaskForm]);

  return (
    <div className="business__drop-content">
      <div className="businessTask businessClass">
        <div id="create-task-container">
          <p className="busines__drop-content__title p__drop-content">
            * - обязательные для заполнения поля
          </p>
          <CreateTaskForm />
        </div>
        <div>
          <button
            className={
              addTask === true ? "blue-btn" : "blue-btn blue-btn__disabled"
            }
            id="add-task"
            onClick={() => saveTask()}
          >
            Добавить еще
          </button>
          <button
            className={
              addTask === true
                ? "blue-btn white-btn"
                : "blue-btn white-btn white-btn__disabled"
            }
            id="save-task"
          >
            Сохранить
          </button>
          <button
            className="defualt__btn"
            id="close-btn"
            onClick={() => {
              setCreateTaskStatus(false);
              setCreateTaskForm({
                name: null,
                begin: null,
                end: null,
                project_id: createBpForm.project_id || null,
                next_id: null,
                parent_id: null,
                prev_id: null,
                description: null,
              });
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
