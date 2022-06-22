import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { StatusContext } from "../../context/status";
import "./CreateTaskForm.scss";

const CreateTaskForm = () => {
  const {
    createTaskForm,
    setCreateTaskForm,
    createTaskStatus,
    setCreateTaskStatus,
    createTaskFormDate,
    setCreateTaskFormDate,
    depsTask,
    setDepsTask,
    nowBp,
  } = useContext(StatusContext);

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
                executor_id: e.target.value,
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
              if (e.target.value.trim() === "") {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  beginDate:
                    new Date().getDate() +
                    "-" +
                    new Date().getMonth() +
                    "-" +
                    new Date().getFullYear(),
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  begin:
                    new Date(
                      createTaskFormDate.beginDate
                    ).toLocaleDateString() +
                    " " +
                    createTaskFormDate.beginTime,
                });
              } else {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  beginDate: e.target.value,
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  begin:
                    new Date(createTaskFormDate.beginDate)
                      .toLocaleDateString()
                      .replace(/\./g, "-") +
                    " " +
                    createTaskFormDate.beginTime,
                });
              }
            }}
          />
          <input
            className="input-form"
            type="time"
            onChange={(e) => {
              if (e.target.value.trim() === "") {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  beginTime: "00:00:00",
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  begin:
                    new Date(createTaskFormDate.beginDate)
                      .toLocaleDateString()
                      .replace(/\./g, "-") +
                    " " +
                    createTaskFormDate.beginTime,
                });
              } else {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  beginTime: e.target.value,
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  begin:
                    new Date(createTaskFormDate.beginDate)
                      .toLocaleDateString()
                      .replace(/\./g, "-") +
                    " " +
                    createTaskFormDate.beginTime,
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
              if (e.target.value.trim() === "") {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  endDate:
                    new Date().getDate() +
                    "-" +
                    new Date().getMonth() +
                    "-" +
                    new Date().getFullYear(),
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  end:
                    new Date(createTaskFormDate.endDate)
                      .toLocaleDateString()
                      .replace(/\./g, "-") +
                    " " +
                    createTaskFormDate.endTime,
                });
              } else {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  endDate: new Date(e.target.value),
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  end:
                    new Date(createTaskFormDate.endDate)
                      .toLocaleDateString()
                      .replace(/\./g, "-") +
                    " " +
                    createTaskFormDate.endTime,
                });
              }
            }}
          />
          <input
            className="input-form"
            type="time"
            onChange={(e) => {
              if (e.target.value.trim() === "") {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  endTime: "00:00:00",
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  end:
                    new Date(createTaskFormDate.endDate)
                      .toLocaleDateString()
                      .replace(/\./g, "-") +
                    " " +
                    createTaskFormDate.endTime,
                });
              } else {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  endTime: e.target.value,
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  end:
                    new Date(createTaskFormDate.endDate)
                      .toLocaleDateString()
                      .replace(/\./g, "-") +
                    " " +
                    createTaskFormDate.endTime,
                });
              }
            }}
          />
        </div>
      </div>
      <div className="form-task__dependencies">
        <div className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/ArrowUDownRight.svg`}
          />
          Зависимости
        </div>
        <div className="form-task__dependencies__btns">
          {/* form-task__dependencies__btn-active */}
          <button
            className={
              depsTask === "Родительская"
                ? "form-task__dependencies__btn-active"
                : ""
            }
            onClick={() => {
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
            onClick={() => {
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
                  parent_id: parseInt(bp.split("|")[bp.split("|").length - 2]),
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
            onClick={() => {
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
            onClick={() => {
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
    </form>
  );
};

export default CreateTaskForm;
