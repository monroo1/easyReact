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
    createTaskSampleFormStatus,
    setValueTaskSample,
    nowTask,
    taskSample,
    setTaskSample,
    setStatusCreateTask,
    setCreateTaskStatus,
    setCreateBpSampleStatus,
    setCreateBpStatus,
    users,
    contract,
    setContractLast,
    contractLast,
    createBpSampleForm,
    createBpForm,
    tasks,
    depsTask,
    setDepsTask,
    depsTaskId,
    setDepsTaskId,
    depsTasksArr,
  } = useContext(StatusContext);

  useEffect(() => {
    if (depsTask === "Родительская") {
      setCreateTaskForm({
        ...createTaskForm,
        prev_id: null,
        parent_id: null,
        next_id: null,
      });
    }
    if (depsTask === "Дочерняя") {
      setCreateTaskForm({
        ...createTaskForm,
        prev_id: null,
        parent_id: depsTaskId,
        next_id: null,
      });
    }
    if (depsTask === "Предыдущая") {
      setCreateTaskForm({
        ...createTaskForm,
        prev_id: null,
        parent_id: null,
        next_id: depsTaskId,
      });
    }
    if (depsTask === "Следующая") {
      setCreateTaskForm({
        ...createTaskForm,
        prev_id: depsTaskId,
        parent_id: null,
        next_id: null,
      });
    }
  }, [depsTaskId]);

  useEffect(() => {
    if (
      contract &&
      createBpSampleForm.type !== 0 &&
      createBpSampleForm.type !== null
    ) {
      setCreateTaskForm({
        ...createTaskForm,
        name: contract.tasks[contractLast.tasks.length]?.name,
      });
      setTaskSample({
        ...taskSample,
        name: contract.tasks[contractLast.tasks.length]?.name,
      });
    }
  }, []);

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
    if (createTaskSampleFormStatus) {
      if (contract?.tasks) {
        setValueTaskSample(contract.tasks);
      }
    }
  }, [createTaskSampleFormStatus]);

  useEffect(() => {
    if (
      createBpSampleForm.type === 1 ||
      createBpSampleForm.type === 2 ||
      createBpSampleForm.type === 3
    ) {
      if (contractLast?.tasks.length > 0) {
        if (contractLast.tasks.length === contract.tasks.length) {
          setStatusCreateTask(false);
          setCreateTaskStatus(false);
          setCreateBpStatus(true);
          setCreateBpSampleStatus(true);
        }
      }
    } else if (createBpSampleForm.type === 0) {
      if (contractLast?.tasks.length > 0) {
        if (contractLast.tasks.length === contract.tasks.length) {
          setStatusCreateTask(false);
          setCreateTaskStatus(false);
          setCreateBpStatus(true);
          setCreateBpSampleStatus(true);
        }
      }
    }
  }, [contractLast]);

  useEffect(() => {
    if (!!nowTask) {
      var date = new Date();
      var datePlus = new Date();
      datePlus.setDate(datePlus.getDate() + 30);
      if (
        createBpSampleForm.type === 1 ||
        createBpSampleForm.type === 2 ||
        createBpSampleForm.type === 3
      ) {
        contract.tasks.map((el) => {
          if (el.name === nowTask.name) {
            setContractLast({
              ...contract,
              tasks: [
                ...contractLast?.tasks,
                {
                  begin:
                    nowTask.begin ||
                    date.toLocaleDateString().replace(/\./g, "-") + " 00:00:00",
                  cyclic_task_id: nowTask.cyclic_task_id,
                  description: nowTask.description,
                  end:
                    nowTask.end ||
                    datePlus.toLocaleDateString().replace(/\./g, "-") +
                      " 00:00:00",
                  executor_id: taskSample.executor_id,
                  name: el.name,
                  next_id: null,
                  parent_id: null,
                  prev_id: null,
                  priority_id: nowTask.priority_id,
                  project_id: createTaskForm.project_id,
                  project_section_id: createTaskForm.project_section_id,
                  provide_to: nowTask.provide_to,
                  status_id: nowTask.status_id,
                  task_load: nowTask.task_load,
                  work_load: nowTask.work_load,
                  workflow_id: nowTask.workflow_id,
                },
              ],
            });
          }
        });
      } else {
        contract.tasks.map((el) => {
          if (el.id === nowTask.id) {
            setContractLast({
              type: 0,
              businessProcess: {
                ...contract.businessProcess,
                name: createBpSampleForm.name,
                project_id: createBpSampleForm.project_id,
                project_section_id: createBpSampleForm.project_section_id,
                tasks: [
                  ...contractLast?.tasks,
                  {
                    begin:
                      nowTask.begin ||
                      date.toLocaleDateString().replace(/\./g, "-") +
                        " 00:00:00",
                    cyclic_task_id: nowTask.cyclic_task_id,
                    description: nowTask.description,
                    end:
                      nowTask.end ||
                      datePlus.toLocaleDateString().replace(/\./g, "-") +
                        " 00:00:00",
                    executor_id: taskSample.executor_id,
                    name: taskSample.name,
                    next_id: nowTask.next_id,
                    parent_id: nowTask.parent_id,
                    prev_id: nowTask.prev_id,
                    priority_id: nowTask.priority_id,
                    project_id: createTaskForm.project_id,
                    project_section_id: createTaskForm.project_section_id,
                    provide_to: nowTask.provide_to,
                    status_id: nowTask.status_id,
                    task_load: nowTask.task_load,
                    work_load: nowTask.work_load,
                    workflow_id: nowTask.workflow_id,
                  },
                ],
              },

              tasks: [
                ...contractLast?.tasks,
                {
                  begin:
                    nowTask.begin ||
                    date.toLocaleDateString().replace(/\./g, "-") + " 00:00:00",
                  cyclic_task_id: nowTask.cyclic_task_id,
                  description: nowTask.description,
                  end:
                    nowTask.end ||
                    datePlus.toLocaleDateString().replace(/\./g, "-") +
                      " 00:00:00",
                  executor_id: taskSample.executor_id,
                  name: taskSample.name,
                  next_id: nowTask.next_id,
                  parent_id: nowTask.parent_id,
                  prev_id: nowTask.prev_id,
                  priority_id: nowTask.priority_id,
                  project_id: createTaskForm.project_id,
                  project_section_id: createTaskForm.project_section_id,
                  provide_to: nowTask.provide_to,
                  status_id: nowTask.status_id,
                  task_load: nowTask.task_load,
                  work_load: nowTask.work_load,
                  workflow_id: nowTask.workflow_id,
                },
              ],
            });
            setTaskSample({
              ...taskSample,
              name: "",
            });
          }
        });
      }

      setCreateTaskForm({
        name: "",
        description: "description",
        begin: null,
        end: null,
        project_id: createBpForm.project_id,
        project_section_id: createBpForm.project_section_id,
        cyclic_task_id: 0,
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
          disabled={
            contract &&
            createBpSampleForm.type !== 0 &&
            createBpSampleForm.type !== null
          }
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
                value={createTaskFormDate.currentBeginDate}
                onChange={(e) => {
                  if (!!e.target.value) {
                    setCreateTaskFormDate({
                      ...createTaskFormDate,
                      beginDate: new Date(e.target.value)
                        .toLocaleDateString()
                        .replace(/\./g, "-"),
                      currentBeginDate: new Date(e.target.value)
                        .toISOString()
                        .split("T")[0],
                    });
                  }
                }}
              />
              <input
                className="input-form"
                type="time"
                value={createTaskFormDate.beginTime}
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
                value={createTaskFormDate.currentEndDate}
                onChange={(e) => {
                  if (!!e.target.value) {
                    setCreateTaskFormDate({
                      ...createTaskFormDate,
                      endDate: new Date(e.target.value)
                        .toLocaleDateString()
                        .replace(/\./g, "-"),
                      currentEndDate: new Date(e.target.value)
                        .toISOString()
                        .split("T")[0],
                    });
                  }
                }}
              />
              <input
                className="input-form"
                type="time"
                value={createTaskFormDate.endTime}
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
                    setDepsTaskId("");
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
                    setDepsTaskId("");
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
                    setDepsTaskId("");
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
                    setDepsTaskId("");
                  }}
                >
                  Следующая
                </button>
              </div>
              <select
                className="input-form input-full"
                style={{ marginTop: 20 + "px" }}
                onChange={(e) => setDepsTaskId(e.target.value)}
                value={depsTaskId}
                disabled={depsTask === "" ? true : false}
              >
                <option value={" "}>Выбрать...</option>
                {depsTasksArr.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
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
          <div className="input-form">Зависимости</div>
        </div>
      )}
    </form>
  );
};

export default CreateTaskForm;
