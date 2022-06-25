import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";
import CreateTaskForm from "../create-task-form/CreateTaskForm";

const CreateTask = () => {
  const {
    nowBp,

    createTaskForm,
    setCreateTaskForm,
    createBpForm,
    setCreateTaskStatus,
    setDepsTask,
    depsTask,
    apiBp,
    setCreateBpForm,
    tasks,
    setTasks,
    setCreateTaskSampleFormStatus,
    createTaskSampleFormStatus,
    setCreateBpSampleForm,
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
          setTasks([...tasks, res.data.id]);
          setDepsTask("");
          setCreateTaskForm({
            ...createTaskForm,
            next_id: null,
            parent_id: null,
            prev_id: null,
          });

          if (depsTask === "Предыдущая") {
            axios
              .patch(
                `https://test.easy-task.ru/api/v1/tasks/${
                  tasks[tasks.length - 2]
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
              .then((res) => console.log(res.data.id));
          }
          if (depsTask === "Следующая") {
            axios
              .patch(
                `https://test.easy-task.ru/api/v1/tasks/${
                  tasks[tasks.length - 2]
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
              .then((res) => setTasks([...tasks, res.data.id]));
          }
          if (depsTask === "Родительская") {
            axios
              .patch(
                `https://test.easy-task.ru/api/v1/tasks/${
                  tasks[tasks.length - 2]
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
              .then((res) => setTasks([...tasks, res.data.id]));
          }
        });
    }
  };

  const saveBp = () => {
    console.log(createBpForm);
    let tasksStr = "";
    for (let i in tasks) {
      tasksStr = tasksStr.concat(tasks[i]);
      if (i < tasks.length - 1) {
        tasksStr = tasksStr.concat("|");
      }
    }

    if (createBpForm.deadlineDate !== null) {
      if (!createBpForm.deadlineTime) {
        setCreateBpForm({ ...createBpForm, deadlineTime: "00:00:00" });
      }
    }
    if (createBpForm.file_id === null || createBpForm.deadlineDate === null) {
      if (createBpForm.file_id === null && createBpForm.deadlineDate === null) {
        fetch(
          `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${createBpForm.initiator_id}&project_id=${createBpForm.project_id}&tasks=${tasksStr}`,
          {
            method: "POST",
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
            console.log(r.businessProcess.tasks);
          });
      }
      if (createBpForm.file_id === null && createBpForm.deadlineDate !== null) {
        fetch(
          `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${
            createBpForm.initiator_id
          }&project_id=${createBpForm.project_id}&deadline=${
            createBpForm.deadlineDate + " " + createBpForm.deadlineTime
          }&tasks=${tasksStr}`,
          {
            method: "POST",
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
            console.log(r.businessProcess.tasks);
          });
      }
      if (createBpForm.deadlineDate === null && createBpForm.file_id !== null) {
        fetch(
          `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${createBpForm.initiator_id}&project_id=${createBpForm.project_id}&tasks=${tasksStr}&file_id=${createBpForm.file_id}`,
          {
            method: "POST",
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
            console.log(r.businessProcess.tasks);
          });
      }
    }
    if (createBpForm.file_id !== null && createBpForm.deadlineDate !== null) {
      fetch(
        `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${
          createBpForm.initiator_id
        }&project_id=${createBpForm.project_id}&deadline=${
          createBpForm.deadlineDate + " " + createBpForm.deadlineTime
        }&tasks=${tasksStr}&file_id=${createBpForm.file_id}`,
        {
          method: "POST",
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
          console.log(r.businessProcess.tasks);
        });
    }
    setCreateBpForm({
      name: null,
      initiator_id: document.cookie.replace(
        /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ),
      project_id: null,
      deadlineDate: null,
      deadlineTime: "00:00:00",
      tasks: null,
      sample: null,
      file_id: null,
      deadline: null,
    });
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
            style={
              !!createTaskSampleFormStatus
                ? { paddingLeft: 64 + "px", paddingRight: 64 + "px" }
                : {}
            }
            onClick={() => saveTask()}
          >
            {!createTaskSampleFormStatus ? "Добавить еще" : "Далее"}
          </button>
          {!createTaskSampleFormStatus ? (
            <button
              className={
                addTask === true
                  ? "blue-btn white-btn"
                  : "blue-btn white-btn white-btn__disabled"
              }
              id="save-task"
              onClick={(e) => saveBp()}
            >
              Сохранить
            </button>
          ) : (
            <></>
          )}

          <button
            className="defualt__btn"
            id="close-btn"
            onClick={() => {
              setCreateTaskStatus(false);
              setCreateTaskSampleFormStatus(false);
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
              setCreateBpSampleForm({
                type: 1,
                businessProcess: {
                  name: null,
                  deadline: null,
                  project_id: null,
                  tasks: 1,
                  initiator_id: document.cookie.replace(
                    /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  ),
                },
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
