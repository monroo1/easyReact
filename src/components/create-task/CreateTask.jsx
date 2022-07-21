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
    contractLast,
    contract,
    setFile,
    createBpSampleForm,
    setDepsTasksArr,
    depsTasksArr,
    depsTaskId,
  } = useContext(StatusContext);

  const [addTask, setAddTask] = useState();
  const [tasksArrCreate, setTasksArrCreate] = useState([]);

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
          body: JSON.stringify({ ...createTaskForm, parent_id: depsTaskId }),
        })
          .then((resesult) => resesult.json())
          .then((res) => {
            setTasks([...tasks, res.data.id]);
            setDepsTasksArr([
              ...depsTasksArr,
              { id: res.data.id, name: res.data.name },
            ]);
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
            setDepsTasksArr([
              ...depsTasksArr,
              { id: res.data.id, name: res.data.name },
            ]);
            console.log(depsTaskId);
            if (depsTask === "Родительская") {
              axios.patch(
                `https://test.easy-task.ru/api/v1/tasks/${depsTaskId}`,
                { parent_id: res.data.id },
                {
                  headers: {
                    Authorization:
                      "Bearer " +
                      document.cookie.replace(
                        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      ),
                    "company-id": 1,
                  },
                }
              );
            }
            if (depsTask === "Следующая") {
              axios.patch(
                `https://test.easy-task.ru/api/v1/tasks/${depsTaskId}`,
                { next_id: res.data.id },
                {
                  headers: {
                    Authorization:
                      "Bearer " +
                      document.cookie.replace(
                        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      ),
                    "company-id": 1,
                  },
                }
              );
            }
            if (depsTask === "Предыдущая") {
              axios.patch(
                `https://test.easy-task.ru/api/v1/tasks/${depsTaskId}`,
                { prev_id: res.data.id },
                {
                  headers: {
                    Authorization:
                      "Bearer " +
                      document.cookie.replace(
                        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      ),
                    "company-id": 1,
                  },
                }
              );
            }
          });
      }
      setCreateTaskForm({
        name: "",
        description: "description",
        begin: null,
        end: null,
        project_id: createTaskForm.project_id,
        cyclic_task_id: 0,
        project_section_id: createTaskForm.project_section_id,
        executor_id: createTaskForm.executor_id,
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
          if (
            createBpSampleForm.type === 1 ||
            createBpSampleForm.type === 2 ||
            createBpSampleForm.type === 3
          ) {
            setTaskSample({
              ...taskSample,
              name: valueTaskSample[1].name,
            });
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
          } else {
            setTaskSample({
              ...taskSample,
              name: createTaskForm.name,
            });
            axios
              .get(
                `https://test.easy-task.ru/api/v1/tasks/${valueTaskSample[0].original_id}`,
                {
                  headers: {
                    Authorization:
                      "Bearer " +
                      document.cookie.replace(
                        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      ),
                    "company-id": 1,
                  },
                }
              )
              .then((res) => {
                console.log(res.data.data);
                setNowTask({
                  ...valueTaskSample[0],

                  begin: res.data.data.begin,
                  end: res.data.data.end,
                  description: "desc",
                  project_id: createBpForm.project_id,
                  project_section_id: createBpForm.project_section_id,
                  executor_id: 512,

                  next_id: !!res.data.data?.next_id
                    ? res.data.data.next_id
                    : null,
                  parent_id: !!res.data.data?.parent_id
                    ? res.data.data.parent_id
                    : null,
                  prev_id: !!res.data.data?.prev_id
                    ? res.data.data.prev_id
                    : null,

                  cyclic_task_id: 0,
                  priority_id: 2,
                  provide_to: 0,
                  status_id: 19, //3
                  task_load: 5,
                  work_load: 35,
                  workflow_id: 1,
                });
              });
          }
          console.log(valueTaskSample[0]);
        }
        if (!!nowTask) {
          for (let i in valueTaskSample) {
            if (valueTaskSample[i].name === nowTask.name) {
              if (
                createBpSampleForm.type === 1 ||
                createBpSampleForm.type === 2 ||
                createBpSampleForm.type === 3
              ) {
                i++;
                setTaskSample({
                  ...taskSample,
                  name: contract.tasks[contractLast.tasks.length + 1]?.name,
                });
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
              } else {
                i++;
                setTaskSample({
                  ...taskSample,
                  name: createTaskForm.name,
                });
                axios
                  .get(
                    `https://test.easy-task.ru/api/v1/tasks/${valueTaskSample[i].original_id}`,
                    {
                      headers: {
                        Authorization:
                          "Bearer " +
                          document.cookie.replace(
                            /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                            "$1"
                          ),
                        "company-id": 1,
                      },
                    }
                  )
                  .then((res) => {
                    console.log(res.data.data);
                    setNowTask({
                      ...valueTaskSample[i],

                      begin: res.data.data.begin,
                      end: res.data.data.end,
                      description: "desc",
                      project_id: createBpForm.project_id,
                      project_section_id: createBpForm.project_section_id,
                      executor_id: 512,

                      next_id: !!res.data.data?.next_id
                        ? res.data.data.next_id
                        : null,
                      parent_id: !!res.data.data?.parent_id
                        ? res.data.data.parent_id
                        : null,
                      prev_id: !!res.data.data?.prev_id
                        ? res.data.data.prev_id
                        : null,

                      cyclic_task_id: 0,
                      priority_id: 2,
                      provide_to: 0,
                      status_id: 19, //3
                      task_load: 5,
                      work_load: 35,
                      workflow_id: 1,
                    });
                  });
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (tasksArrCreate.length > 0) {
      if (createBpForm.file_id === null) {
        axios
          .post(
            `${apiBp}/businessProcess`,
            {
              type: 0,
              businessProcess: {
                name: createBpForm.name,
                initiator_id: createBpForm.initiator_id,
                project_id: createBpForm.project_id,
                project_section_id: createBpForm.project_section_id,
                deadline:
                  createBpForm.deadlineDate + " " + createBpForm.deadlineTime,
                tasks: tasksArrCreate,
              },
            },
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
      } else {
        axios
          .post(
            `${apiBp}/businessProcess`,
            {
              type: 0,
              businessProcess: {
                name: createBpForm.name,
                initiator_id: createBpForm.initiator_id,
                project_id: createBpForm.project_id,
                project_section_id: createBpForm.project_section_id,
                deadline:
                  createBpForm.deadlineDate + " " + createBpForm.deadlineTime,
                file_id: createBpForm.file_id,
                tasks: tasksArrCreate,
              },
            },
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
      }
      setFile({});
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
  }, [tasksArrCreate]);

  const saveBp = () => {
    if (tasks.length > 0 && !addTasksMenu) {
      console.log(tasks);

      const getTasks = tasks.map((el) => {
        const link = `https://test.easy-task.ru/api/v1/tasks/${el}`;
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

      Promise.all(getTasks).then((res) =>
        setTasksArrCreate(
          res.map((el) => {
            return {
              name: el.data.data.name,
              executor_id: el.data.data.executor_id,
              deadline: "2022-07-10 00:00:00",
              original_id: el.data.data.id,
            };
          })
        )
      );
    }
    if (addTasksMenu) {
      let a = [];
      tasks.map((el) => {
        axios
          .get(`https://test.easy-task.ru/api/v1/tasks/${el}`, {
            headers: {
              Authorization:
                "Bearer " +
                document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
            },
          })
          .then((res) => {
            a.push({
              original_id: res.data.data.id,
              deadline: res.data.data.end,
              name: res.data.data.name,
              executor_id: res.data.data.executor_id,
            });
          });
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
