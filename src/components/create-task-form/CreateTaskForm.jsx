import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
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
    nowBp,
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
      .then((res) =>
        setCreateTaskForm({
          ...createTaskForm,
          project_section_id: parseInt(res.data.data[0].project_section_id),
        })
      );
  }, []);

  return (
    <form id="new-bp__form">
      <div>
        <label className="p__drop-content" htmlFor="input-name-Task">
          <img src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`} />
          Нименование задачи*
        </label>
        <input
          className="input-form input-name-task__list"
          type="text"
          id="input-name-task"
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              setCreateTaskForm({ ...createTaskForm, name: null });
            } else {
              setCreateTaskForm({ ...createTaskForm, name: e.target.value });
            }
          }}
        />
      </div>
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
                  setCreateTaskForm({ ...createTaskForm, description: "Desc" });
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
                  setCreateTaskForm({ ...createTaskForm, description: "Desc" });
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
                  setCreateTaskForm({ ...createTaskForm, description: "Desc" });
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
      <div>
        <label className="p__drop-content" htmlFor="businessTask__executor">
          <img src={`${process.env.PUBLIC_URL}/assets/input/User.svg`} />
          Id Исполнителя
        </label>
        <input
          className="input-form"
          type="text"
          id="businessTask__executor"
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              setCreateTaskForm({ ...createTaskForm, executor_id: 512 });
            } else {
              setCreateTaskForm({
                ...createTaskForm,
                executor_id: parseInt(e.target.value),
              });
            }
          }}
        />
      </div>
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
      {!!nowBp?.tasks ? (
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
                let bp = nowBp.tasks;
                setCreateTaskForm({
                  ...createTaskForm,
                  next_id: null,
                  prev_id: null,
                });
                if (!!bp.split("|")[bp.split("|").length - 2]) {
                  setCreateTaskForm({
                    ...createTaskForm,
                    parent_id: parseInt(
                      bp.split("|")[bp.split("|").length - 2]
                    ),
                  });
                }
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
    </form>
  );
};

export default CreateTaskForm;
