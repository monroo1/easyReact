import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { StatusContext } from "../../context/status";
import "./CreateTaskForm.scss";

const CreateTaskForm = () => {
  const {
    createTaskForm,
    setCreateTaskForm,
    createTaskFormDate,
    setCreateTaskFormDate,
    depsTask,
    setDepsTask,
    tasks,
    createTaskSampleFormStatus,
    sampleArr,
    idSample,
    arrTasksSample,
    setArrTasksSample,
    valueTaskSample,
    setValueTaskSample,
    nowTask,
    setTasksArr,
    tasksArr,
    taskSample,
    setTaskSample,
    setStatusCreateTask,
    setCreateTaskStatus,
    setCreateBpSampleStatus,
    setLengthArrTasks,
    setCreateBpStatus,
    users,
  } = useContext(StatusContext);

  useEffect(() => {
    if (
      !!createTaskFormDate.endDate &&
      !!createTaskFormDate.endTime &&
      !!createTaskFormDate.beginDate &&
      !!createTaskFormDate.beginTime
    ) {
      setCreateTaskForm({
        ...createTaskForm,
        end:
          createTaskFormDate.endDate + " " + createTaskFormDate.endTime + ":00",
        begin:
          createTaskFormDate.beginDate +
          " " +
          createTaskFormDate.beginTime +
          ":00",
      });
    }
  }, [createTaskFormDate]);

  useEffect(() => {
    axios
      .get(
        `https://test.easy-task.ru/api/v1/tasks?project_id=${createTaskForm.project_id}`,
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
      .then((res) => {
        if (!!res.data.data[0].project_section_id) {
          setCreateTaskForm({
            ...createTaskForm,
            project_section_id: parseInt(res.data.data[0].project_section_id),
          });
        }
      });
  }, []);

  useEffect(() => {
    if (createTaskSampleFormStatus) {
      let bp = sampleArr.filter((el) => el.id === parseInt(idSample));

      if (bp[0].tasksId) {
        setArrTasksSample([...bp[0].tasksId.split("|")]);
      }

      if (bp[0].businessProcessId) {
        if (bp[0].businessProcessId.tasks) {
          let arrMas = [];
          for (let i in bp[0].businessProcessId.tasks) {
            arrMas.push(bp[0].businessProcessId.tasks[i].id);
          }
          setArrTasksSample([...arrMas]);
        }
      }
    }
  }, [createTaskSampleFormStatus]);

  useEffect(() => {
    if (arrTasksSample.length >= 1) {
      Promise.all(
        arrTasksSample.map(async (el) => {
          return axios
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
            .then((result) => {
              return result.data.data;
            });
        })
      )
        .then((r) => setValueTaskSample(r))
        .catch((err) => console.log("err " + err));
    }
  }, [arrTasksSample]);

  useEffect(() => {
    if (tasksArr.length > 0) {
      if (tasksArr.length === valueTaskSample.length) {
        setStatusCreateTask(false);
        setCreateTaskStatus(false);
        setCreateBpStatus(true);
        setCreateBpSampleStatus(true);
      }
    }
  }, [tasksArr]);

  useEffect(() => {
    setTaskSample(createTaskForm);
    if (!!nowTask) {
      axios
        .post(
          `https://test.easy-task.ru/api/v1/tasks`,
          {
            author_id: nowTask.author_id,
            begin: nowTask.begin,
            cyclic_task_id: nowTask.cyclic_task_id,
            description: nowTask.description,
            end: nowTask.end,
            executor_id: taskSample.executor_id,
            name: taskSample.name,
            next_id: null,
            parent_id: null,
            prev_id: null,
            priority_id: nowTask.priority_id,
            project_id: nowTask.project_id,
            project_section_id: nowTask.project_section_id,
            provide_to: nowTask.provide_to,
            status_id: nowTask.status_id,
            status_related_user_id: null,
            task_load: nowTask.task_load,
            task_load_sum: nowTask.task_load_sum,
            timesheets: nowTask.timesheets,
            work_load: nowTask.work_load,
            workflow_id: nowTask.workflow_id,
          },
          {
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
          }
        )
        .then((res) => {
          setTaskSample({
            ...taskSample,
            name: "",
          });
          setTasksArr([...tasksArr, res.data.data.id]);
          setCreateTaskForm({ ...createTaskForm, name: "" });
        })
        .catch((err) => {
          setLengthArrTasks(tasksArr.length);
          setTaskSample({
            ...taskSample,
          });
          console.log("errrrr " + err);
        });
    }
  }, [nowTask]);

  const executors = useMemo(
    () => users.filter((user) => user.roles.includes(7)),
    [users]
  );

  return (
    <form id="new-bp__form">
      <div>
        <label className="p__drop-content" htmlFor="input-name-Task">
          <img src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`} />
          Название задачи*
        </label>
        <input
          className="input-form input-name-task__list"
          type="text"
          id="input-name-task"
          value={taskSample.name}
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              setCreateTaskForm({ ...createTaskForm, name: "" });
              setTaskSample({ ...taskSample, name: "" });
            } else {
              setCreateTaskForm({ ...createTaskForm, name: e.target.value });
              setTaskSample({ ...taskSample, name: e.target.value });
            }
          }}
        />
      </div>
      {!createTaskSampleFormStatus ? (
        <div>
          <label className="p__drop-content">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/NewspaperClipping.svg`}
            />
            Описание
          </label>
          <div className="input-form" id="businessTask__description">
            <div>
              <label htmlFor="businessTask__description__what">
                Что нужно сделать:
              </label>
              <input
                type="text"
                id="businessTask__description__what"
                onChange={(e) => {
                  if (e.target.value.trim() === "") {
                    setCreateTaskForm({
                      ...createTaskForm,
                      description: "Desc",
                    });
                  } else {
                    setCreateTaskForm({
                      ...createTaskForm,
                      description: e.target.value,
                    });
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="businessTask__description__as">
                Как нужно сделать:
              </label>
              <input
                type="text"
                id="businessTask__description__as"
                onChange={(e) => {
                  if (e.target.value.trim() === "") {
                    setCreateTaskForm({
                      ...createTaskForm,
                      description: "Desc",
                    });
                  } else {
                    setCreateTaskForm({
                      ...createTaskForm,
                      description: e.target.value,
                    });
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="businessTask__description__result">
                Какой должен быть результат:
              </label>
              <input
                type="text"
                id="businessTask__description__result"
                onChange={(e) => {
                  if (e.target.value.trim() === "") {
                    setCreateTaskForm({
                      ...createTaskForm,
                      description: "Desc",
                    });
                  } else {
                    setCreateTaskForm({
                      ...createTaskForm,
                      description: e.target.value,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <label className="p__drop-content" htmlFor="businessTask__executor">
          <img src={`${process.env.PUBLIC_URL}/assets/input/User.svg`} />
          Исполнитель
        </label>
        <select
          className="input-form"
          id="businessTask__executor"
          value={taskSample.executor_id}
          onChange={(e) => {
            setCreateTaskForm({
              ...createTaskForm,
              executor_id: parseInt(e.target.value),
            });
            setTaskSample({
              ...taskSample,
              executor_id: parseInt(e.target.value),
            });
          }}
        >
          {executors.map((executor) => (
            <option key={executor.id} value={executor.id}>
              {executor.name} {executor.surname}
            </option>
          ))}
        </select>
      </div>
      {!createTaskSampleFormStatus ? (
        <>
          <div className="input__date">
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
              />
              Дата и время начала
            </label>
            <div>
              <input
                className="input-form"
                type="date"
                id="businessTask__date-start"
                htmlFor="businessTask__date-start"
                onChange={(e) => {
                  if (!!e.target.value) {
                    setCreateTaskFormDate({
                      ...createTaskFormDate,
                      beginDate: new Date(e.target.value)
                        .toLocaleDateString()
                        .replace(/\./g, "-"),
                    });
                  }
                }}
              />
              <input
                className="input-form"
                type="time"
                onChange={(e) => {
                  if (!!e.target.value) {
                    setCreateTaskFormDate({
                      ...createTaskFormDate,
                      beginTime: e.target.value,
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className="input__date">
            <label className="p__drop-content" htmlFor="businessTask__date-end">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
              />
              Дата и время окончания
            </label>
            <div>
              <input
                className="input-form"
                type="date"
                id="businessTask__date-end"
                onChange={(e) => {
                  if (!!e.target.value) {
                    setCreateTaskFormDate({
                      ...createTaskFormDate,
                      endDate: new Date(e.target.value)
                        .toLocaleDateString()
                        .replace(/\./g, "-"),
                    });
                  }
                }}
              />
              <input
                className="input-form"
                type="time"
                onChange={(e) => {
                  if (!!e.target.value) {
                    setCreateTaskFormDate({
                      ...createTaskFormDate,
                      endTime: e.target.value,
                    });
                  }
                }}
              />
            </div>
          </div>
          {tasks.length >= 1 ? (
            <div className="form-task__dependencies">
              <div className="p__drop-content">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/input/ArrowUDownRight.svg`}
                />
                Зависимости
              </div>
              <div className="form-task__dependencies__btns">
                <button
                  className={
                    depsTask === "Родительская"
                      ? "form-task__dependencies__btn-active"
                      : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setDepsTask("Родительская");
                    setCreateTaskForm({
                      ...createTaskForm,
                      prev_id: null,
                      parent_id: null,
                      next_id: null,
                    });
                  }}
                >
                  Родительская
                </button>
                <button
                  className={
                    depsTask === "Дочерняя"
                      ? "form-task__dependencies__btn-active"
                      : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setDepsTask("Дочерняя");
                    setCreateTaskForm({
                      ...createTaskForm,
                      next_id: null,
                      prev_id: null,
                      parent_id: tasks[tasks.length - 1],
                    });
                  }}
                >
                  Дочерняя
                </button>
                <button
                  className={
                    depsTask === "Предыдущая"
                      ? "form-task__dependencies__btn-active"
                      : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setDepsTask("Предыдущая");
                    setCreateTaskForm({
                      ...createTaskForm,
                      next_id: null,
                      parent_id: null,
                    });
                  }}
                >
                  Предыдущая
                </button>
                <button
                  className={
                    depsTask === "Следующая"
                      ? "form-task__dependencies__btn-active"
                      : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setDepsTask("Следующая");
                    setCreateTaskForm({
                      ...createTaskForm,
                      prev_id: null,
                      parent_id: null,
                    });
                  }}
                >
                  Следующая
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="task-sample__deps">
          <div className="p__drop-content">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/ArrowUDownRight.svg`}
            />
            Зависимости
          </div>
          <div className="input-form">123</div>
        </div>
      )}
    </form>
  );
};

export default CreateTaskForm;
