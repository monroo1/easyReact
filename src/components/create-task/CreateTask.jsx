import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";
import CreateTaskForm from "../create-task-form/CreateTaskForm";

const CreateTask = () => {
  const {
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
    setTasksArr,
    valueTaskSample,
    nowTask,
    setNowTask,
    statusCreateTask,
    addTaskSample,
    taskSample,
    setAddTaskSample,
    setCreateBpSampleForm,
    setStatusCreateTask,
    addTasksMenu,
    setAddTasksMenu,
    setTaskSample,
    thisBp,
    setCreateTaskFormDate,
    tasksArr,
    contractLast,
    contract,
  } = useContext(StatusContext);
  const [addTask, setAddTask] = useState();

  useEffect(() => {
    if (addTasksMenu) {
      console.log(tasks);
      setCreateTaskForm({
        ...createTaskForm,
        project_section_id: thisBp.project_section_id,
        project_id: thisBp.project_id,
      });
      setCreateBpForm({
        ...createBpForm,
        name: thisBp.name,
        project_section_id: thisBp.project_section_id,
        project_id: thisBp.project_id,
      });
    }
  }, []);

  const saveTask = () => {
    if (!!addTask) {
      if (depsTask === "Дочерняя") {
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
          });
        setDepsTask("");
      } else {
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
            console.log(res.data.id);
            setTasks([...tasks, res.data.id]);

            if (depsTask === "Предыдущая") {
              axios
                .patch(
                  `https://test.easy-task.ru/api/v1/tasks/${
                    tasks[tasks.length - 1]
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
                .then((res) => {});
            }
            if (depsTask === "Следующая") {
              axios
                .patch(
                  `https://test.easy-task.ru/api/v1/tasks/${
                    tasks[tasks.length - 1]
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
                .then((res) => {});
            }
            if (depsTask === "Родительская") {
              axios
                .patch(
                  `https://test.easy-task.ru/api/v1/tasks/${
                    tasks[tasks.length - 1]
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
                .then((res) => {});
            }
            // setCreateTaskForm({
            //   name: "",
            //   description: "description",
            //   begin: null,
            //   end: null,
            //   project_id: 35,
            //   cyclic_task_id: 0,
            //   project_section_id: 124,
            //   executor_id: 512,
            //   next_id: null,
            //   parent_id: null,
            //   prev_id: null,
            //   priority_id: 2,
            //   provide_to: 0,
            //   status_id: 19,
            //   task_load: 5,
            //   work_load: 35,
            //   workflow_id: 1,
            // });
            // setCreateTaskFormDate({
            //   currentBeginDate: "",
            //   beginDate: null,
            //   beginTime: "",
            //   currentEndDate: "",
            //   endDate: null,
            //   endTime: "",
            // });
            // setDepsTask("");
            // setCreateTaskForm({
            //   ...createTaskForm,
            //   next_id: null,
            //   parent_id: null,
            //   prev_id: null,
            // });
          });
      }
      setCreateTaskForm({
        name: "",
        description: "description",
        begin: null,
        end: null,
        project_id: 35,
        cyclic_task_id: 0,
        project_section_id: 124,
        executor_id: 512,
        next_id: null,
        parent_id: null,
        prev_id: null,
        priority_id: 2,
        provide_to: 0,
        status_id: 19,
        task_load: 5,
        work_load: 35,
        workflow_id: 1,
      });
      setCreateTaskFormDate({
        currentBeginDate: "",
        beginDate: null,
        beginTime: "",
        currentEndDate: "",
        endDate: null,
        endTime: "",
      });
      setTaskSample({ ...taskSample, name: "" });
    }
    if (statusCreateTask) {
      if (addTaskSample) {
        if (!nowTask) {
          setNowTask({
            ...valueTaskSample[0],

            begin: null,
            end: null,
            description: "desc",
            project_id: createBpForm.project_id,
            project_section_id: createBpForm.project_section_id,
            executor_id: 512,

            cyclic_task_id: 0,
            priority_id: 2,
            provide_to: 0,
            status_id: 19, //3
            task_load: 5,
            work_load: 35,
            workflow_id: 1,
          });

          setTaskSample({
            ...taskSample,
            name: valueTaskSample[1].name,
          });
          // if(valueTaskSample.length === 1){

          // }
        }
        if (!!nowTask) {
          for (let i in valueTaskSample) {
            if (valueTaskSample[i].name === nowTask.name) {
              setTaskSample({
                ...taskSample,
                name: contract.tasks[contractLast.tasks.length + 1]?.name,
              });
              i++;
              setNowTask({
                ...valueTaskSample[i],

                begin: null,
                end: null,
                description: "desc",
                project_id: createBpForm.project_id,
                project_section_id: createBpForm.project_section_id,
                executor_id: 512,

                cyclic_task_id: 0,
                priority_id: 2,
                provide_to: 0,
                status_id: 19, //3
                task_load: 5,
                work_load: 35,
                workflow_id: 1,
              });
            }
          }
        }
      }
    }
  };

  const saveBp = () => {
    if (tasks.length > 0 && !addTasksMenu) {
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
        if (
          createBpForm.file_id === null &&
          createBpForm.deadlineDate === null
        ) {
          fetch(
            `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${createBpForm.initiator_id}&project_id=${createBpForm.project_id}&project_section_id=${createBpForm.project_section_id}&tasks=${tasksStr}`,
            {
              method: "POST",
              headers: {
                "secret-token": document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
              },
            }
          ).then((res) => res.json());
        }
        if (
          createBpForm.file_id === null &&
          createBpForm.deadlineDate !== null
        ) {
          fetch(
            `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${
              createBpForm.initiator_id
            }&project_id=${createBpForm.project_id}&project_section_id=${
              createBpForm.project_section_id
            }&deadline=${
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
          ).then((res) => res.json());
        }
        if (
          createBpForm.deadlineDate === null &&
          createBpForm.file_id !== null
        ) {
          fetch(
            `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${createBpForm.initiator_id}&project_id=${createBpForm.project_id}&project_section_id=${createBpForm.project_section_id}&tasks=${tasksStr}&file_id=${createBpForm.file_id}`,
            {
              method: "POST",
              headers: {
                "secret-token": document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
              },
            }
          ).then((res) => res.json());
        }
      }
      if (createBpForm.file_id !== null && createBpForm.deadlineDate !== null) {
        fetch(
          `${apiBp}/businessProcess?name=${createBpForm.name}&initiator_id=${
            createBpForm.initiator_id
          }&project_id=${createBpForm.project_id}&project_section_id=${
            createBpForm.project_section_id
          }&deadline=${
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
        ).then((res) => res.json());
      }
      setCreateBpForm({
        name: null,
        initiator_id: parseInt(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        ),
        project_id: createBpForm.project_id,
        deadlineDate: null,
        deadlineTime: "00:00:00",
        tasks: null,
        file_id: null,
        deadline: null,
      });

      setCreateTaskStatus(false);
      setCreateTaskSampleFormStatus(false);
      setStatusCreateTask(false);
      setCreateTaskForm({
        ...createTaskForm,
        createTaskForm: createTaskForm.project_section_id,
      });
      setTasks([]);
      setTasksArr([]);
      setNowTask("");
      setCreateBpSampleForm({
        type: 0,
        businessProcess: {
          name: null,
          deadline: null,
          project_id: null,
          tasks: 1,
          initiator_id: parseInt(
            document.cookie.replace(
              /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            )
          ),
        },
        options: [],
      });
    }
    if (addTasksMenu) {
      let a = tasks.map((el) => {
        return { id: el };
      });

      axios
        .patch(
          `${apiBp}/businessProcess/${thisBp.id}/addTasks`,
          { tasks: a },
          {
            headers: {
              "secret-token": document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
            },
          }
        )
        .then((res) => console.log(res));

      setCreateBpForm({
        name: null,
        initiator_id: parseInt(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        ),
        project_id: createBpForm.project_id,
        deadlineDate: null,
        deadlineTime: "00:00:00",
        tasks: null,
        file_id: null,
        deadline: null,
      });

      setCreateTaskStatus(false);
      setCreateTaskSampleFormStatus(false);
      setStatusCreateTask(false);
      setCreateTaskForm({
        ...createTaskForm,
        createTaskForm: createTaskForm.project_section_id,
      });
      setTasks([]);
      setTasksArr([]);
      setNowTask("");
      setCreateBpSampleForm({
        type: 0,
        businessProcess: {
          name: null,
          deadline: null,
          project_id: null,
          tasks: 1,
          initiator_id: parseInt(
            document.cookie.replace(
              /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            )
          ),
        },
        options: [],
      });
    }
  };

  useEffect(() => {
    if (createTaskForm.name && createTaskForm.begin && createTaskForm.end) {
      setAddTask(true);
    } else {
      setAddTask(false);
    }
    if (
      createTaskSampleFormStatus &&
      !!taskSample.name &&
      !!taskSample.executor_id
    ) {
      setAddTaskSample(true);
    } else {
      setAddTaskSample(false);
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
              addTask || addTaskSample
                ? "blue-btn"
                : "blue-btn blue-btn__disabled"
            }
            id="add-task"
            style={
              !!createTaskSampleFormStatus
                ? { paddingLeft: 64 + "px", paddingRight: 64 + "px" }
                : {}
            }
            onClick={() => {
              saveTask();
            }}
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
              onClick={() => saveBp()}
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
              if (tasks.length > 0) {
                const delTasks = tasks.map((el) => {
                  const link = `https://test.easy-task.ru/api/v1/tasks/${el}`;
                  return axios.delete(link, {
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

                Promise.all(delTasks).then((res) => console.log(res));
              }
              setCreateTaskForm({
                name: "",
                description: "description",
                begin: null,
                end: null,
                project_id: 35,
                cyclic_task_id: 0,
                project_section_id: 124,
                executor_id: 512,
                next_id: null,
                parent_id: null,
                prev_id: null,
                priority_id: 2,
                provide_to: 0,
                status_id: 19,
                task_load: 5,
                work_load: 35,
                workflow_id: 1,
              });
              setCreateBpForm({
                name: null,
                initiator_id: parseInt(
                  document.cookie.replace(
                    /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  )
                ),
                project_id: createBpForm.project_id,
                deadlineDate: null,
                deadlineTime: "00:00:00",
                tasks: null,
                file_id: null,
                deadline: null,
              });

              setCreateTaskStatus(false);
              setCreateTaskSampleFormStatus(false);
              setStatusCreateTask(false);

              setCreateTaskForm({
                ...createTaskForm,
                createTaskForm: createTaskForm.project_section_id,
              });
              setTasks([]);
              setTasksArr([]);
              setNowTask("");

              setCreateBpSampleForm({
                type: 0,
                businessProcess: {
                  name: null,
                  deadline: null,
                  project_id: null,
                  tasks: 1,
                  initiator_id: parseInt(
                    document.cookie.replace(
                      /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                      "$1"
                    )
                  ),
                },
                options: [],
              });
              setAddTasksMenu(false);
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
