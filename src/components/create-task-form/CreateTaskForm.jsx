import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { StatusContext } from "../../context/status";

const CreateTaskForm = () => {
  const {
    createTaskForm,
    setCreateTaskForm,
    createTaskStatus,
    setCreateTaskStatus,
    createTaskFormDate,
    setCreateTaskFormDate,
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
                    createTaskFormDate.beginDate +
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
                    createTaskFormDate.beginDate +
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
                    createTaskFormDate.beginDate +
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
                    createTaskFormDate.beginDate +
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
                    createTaskFormDate.endDate +
                    " " +
                    createTaskFormDate.endTime,
                });
              } else {
                setCreateTaskFormDate({
                  ...createTaskFormDate,
                  endDate: e.target.value,
                });
                setCreateTaskForm({
                  ...createTaskForm,
                  end:
                    createTaskFormDate.endDate +
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
                    createTaskFormDate.endDate +
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
                    createTaskFormDate.endDate +
                    " " +
                    createTaskFormDate.endTime,
                });
              }
            }}
          />
        </div>
      </div>
      <div>
        <label className="p__drop-content" htmlFor="businessTask__dependencies">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/ArrowUDownRight.svg`}
          />
          Зависимости
        </label>
        <input
          className="input-form"
          type="text"
          id="businessTask__dependencies"
        />
      </div>
    </form>
  );
};

export default CreateTaskForm;
