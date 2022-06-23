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
    setDepsTask,
    depsTask,
    apiBp,
  } = useContext(StatusContext);
  const [addTask, setAddTask] = useState();

  const saveTask = () => {
    if (!!addTask) {
      fetch("https://test.easy-task.ru/api/v1/tasks", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            ),
          "company-id": document.cookie.replace(
            /(?:(?:^|.*;\s*)company_id\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
        body: JSON.stringify(createTaskForm),
      })
        .then((resesult) => resesult.json())
        .then((res) => {
          console.log(res);
          setDepsTask("");
          setCreateTaskForm({
            ...createTaskForm,
            next_id: null,
            parent_id: null,
            prev_id: null,
          });

          if (depsTask === "Предыдущая") {
            let bp = nowBp.tasks;
            axios
              .patch(
                `https://test.easy-task.ru/api/v1/tasks/${
                  bp.split("|")[bp.split("|").length - 2]
                }`,
                { prev_id: res.data.id },
                {
                  headers: {
                    Authorization:
                      "Bearer " +
                      document.cookie.replace(
                        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      ),
                  },
                }
              )
              .then((res) => console.log(res));
          }
          if (depsTask === "Следующая") {
            let bp = nowBp.tasks;
            axios
              .patch(
                `https://test.easy-task.ru/api/v1/tasks/${
                  bp.split("|")[bp.split("|").length - 2]
                }`,
                { next_id: res.data.id },
                {
                  headers: {
                    Authorization:
                      "Bearer " +
                      document.cookie.replace(
                        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      ),
                  },
                }
              )
              .then((res) => console.log(res));
          }
          if (depsTask === "Родительская") {
            let bp = nowBp.tasks;
            console.log(bp.split("|")[bp.split("|").length - 2]);
            axios
              .patch(
                `https://test.easy-task.ru/api/v1/tasks/${
                  bp.split("|")[bp.split("|").length - 2]
                }`,
                { parent_id: res.data.id },
                {
                  headers: {
                    Authorization:
                      "Bearer " +
                      document.cookie.replace(
                        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      ),
                  },
                }
              )
              .then((res) => console.log(res));
          }

          fetch(
            `${apiBp}/businessProcess/${nowBp.id}?tasks=${nowBp.tasks.trim()}${
              res.data.id
            }`,
            {
              method: "PATCH",
              headers: {
                "secret-token": document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
              },
            }
          )
            .then((res) => res.json())
            .then((r) => {
              let taskss = "";
              for (let i of r.tasks) {
                taskss = taskss.concat(i.id + "|");
              }
              setNowBp({
                id: r.businessProcess.id,
                tasks: taskss,
              });
            });
        });
    }
  };

  useEffect(() => {
    if (createTaskForm.name && createTaskForm.begin && createTaskForm.end) {
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
