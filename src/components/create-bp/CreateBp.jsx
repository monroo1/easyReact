import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StatusContext } from "../../context/status";
import "./CreateBp.scss";

const CreateBp = () => {
  const {
    apiBp,
    setCreateBpStatus,
    createBpForm,
    setCreateBpForm,
    setCreateTaskStatus,
    bearer,
    createTaskForm,
    setCreateTaskForm,
  } = useContext(StatusContext);
  const [projects, setProjects] = useState([]);
  const [accessNext, setAccessNext] = useState("blue-btn blue-btn__disabled");
  const [nextLinkProjects, setNextLinkProjects] = useState(
    "https://test.easy-task.ru/api/v1/projects"
  );

  const submitFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(`${apiBp}/loadFile`, formData, {
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
      })

      .then((res) => {
        setCreateBpForm({ ...createBpForm, file_id: res.data.id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextCreateTasks = () => {
    if (createBpForm.name !== null && createBpForm.project_id !== null) {
      setCreateBpStatus(false);
      setCreateTaskStatus(true);
    }
  };

  useEffect(() => {
    if (createBpForm.name !== null && createBpForm.project_id !== null) {
      setAccessNext("blue-btn");
    } else {
      setAccessNext("blue-btn blue-btn__disabled");
    }
  }, [createBpForm]);

  useEffect(() => {
    if (!!nextLinkProjects) {
      axios
        .get(nextLinkProjects, {
          headers: {
            Authorization: "Bearer " + bearer,
          },
        })
        .then((res) => {
          setProjects([...projects, ...res.data.data]);
          setNextLinkProjects(res.data.links.next);
        });
    }
  }, [nextLinkProjects]);

  return (
    <div className="business__drop-content">
      <div id="business" className="businessClass">
        <div>
          <p className="business__drop-content__title p__drop-content">
            * - обязательные для заполнения поля
          </p>
          <form id="new-bp__form">
            <div>
              <label className="p__drop-content" htmlFor="input-name">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                  alt="Article"
                />
                Название*
              </label>
              <input
                className="input-form"
                type="text"
                id="input-name"
                onChange={(e) => {
                  if (e.target.value.trim() === "") {
                    setCreateBpForm({ ...createBpForm, name: null });
                  } else {
                    setCreateBpForm({ ...createBpForm, name: e.target.value });
                  }
                }}
              />
            </div>
            <div>
              <label className="p__drop-content" htmlFor="input-project">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                  alt="Article"
                />
                Проект*
              </label>
              <select
                className="input-form"
                onChange={(e) => {
                  if (e.target.value.trim() === "") {
                    setCreateBpForm({
                      ...createBpForm,
                      project_id: null,
                    });
                    setCreateTaskForm({
                      ...createTaskForm,
                      project_id: parseInt(e.target.value),
                    });
                  } else {
                    setCreateBpForm({
                      ...createBpForm,
                      project_id: e.target.value,
                    });
                    setCreateTaskForm({
                      ...createTaskForm,
                      project_id: parseInt(e.target.value),
                    });
                  }
                }}
              >
                <option value={null}>Выбрать</option>
                {projects.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="p__drop-content" htmlFor="input-initiator">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/input/User.svg`}
                  alt="User"
                />
                Инициатор
              </label>

              <select
                className="input-form"
                onChange={(e) => {
                  if (e.target.value.trim() === "") {
                    setCreateBpForm({ ...createBpForm, initiator_id: null });
                  } else {
                    setCreateBpForm({
                      ...createBpForm,
                      initiator_id: e.target.value,
                    });
                  }
                }}
              >
                <option>Выбрать</option>
              </select>
            </div>
            <div className="input__date">
              <label className="p__drop-content">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
                  alt="CalendarBlank"
                />
                Общий срок
              </label>
              <div>
                <input
                  className="input-form"
                  type="date"
                  id="input-date"
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setCreateBpForm({
                        ...createBpForm,
                        deadlineDate: null,
                      });
                    } else {
                      setCreateBpForm({
                        ...createBpForm,
                        deadlineDate: e.target.value,
                      });
                    }
                  }}
                />
                <input
                  className="input-form"
                  type="time"
                  id="input-time"
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setCreateBpForm({
                        ...createBpForm,
                        deadlindeadlineTimeeDate: null,
                      });
                    } else {
                      setCreateBpForm({
                        ...createBpForm,
                        deadlineTime: e.target.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div id="input-download">
              <label
                className="p__drop-content"
                htmlFor="input-download__input"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/input/Vector.svg`}
                  alt="Vector"
                />
                Прикрепить файл
              </label>
              <input
                type="file"
                id="input-download__input"
                onChange={(e) => submitFile(e)}
              />
              <label
                className="p__drop-content"
                htmlFor="input-download__input"
                id="input-download__input-label"
              >
                Выбрать
              </label>
            </div>
          </form>
        </div>
        <div>
          <button
            className={accessNext}
            id="bussines-next"
            onClick={() => nextCreateTasks()}
          >
            Далее
          </button>
          <button
            className="defualt__btn"
            id="close-btn"
            onClick={() => {
              setCreateBpStatus(false);
              setCreateBpForm({
                name: null,
                initiator_id: null,
                project_id: null,
                deadlineDate: null,
                deadlineTime: null,
                tasks: null,
                sample: null,
                file_id: null,
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
export default CreateBp;
