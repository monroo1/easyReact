import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StatusContext } from "../../context/status";
import BpResultFormDismissal from "../bp-result-form-dismissal/BpResultFormDismissal";
import BpResultFormWork from "../bp-result-form-work/BpResultFormWork";
import BpResultFormTreaty from "../bp-result-form-treaty/BpResultFormTreaty";
import "./CreateBp.scss";
const API = "https://8ebd466487fd85.lhrtunnel.link/api/v1";

const CreateBp = () => {
  const {
    setCreateBpStatus,
    createBpForm,
    setCreateBpForm,
    bearer,
    setCreateTaskStatus,
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
      .post(`${API}/loadFile`, formData, {
        headers: {
          secret_token: document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
      })

      .then((res) => {
        setCreateBpForm({ ...createBpForm, file_id: res.data.id });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveBp = () => {
    if (createBpForm.name !== null && createBpForm.project_id !== null) {
      if (
        createBpForm.sample === "work" ||
        createBpForm.sample === "dismissal" ||
        createBpForm.sample === "договор"
      ) {
        console.log(createBpForm);
      } else {
        setCreateBpStatus(false);
        setCreateTaskStatus(true);

        if (createBpForm.deadlineDate !== null) {
          if (!createBpForm.deadlineTime) {
            setCreateBpForm({ ...createBpForm, deadlineTime: "00:00:00" });
          }
        }

        console.log(createBpForm);

        if (
          createBpForm.file_id === null ||
          createBpForm.deadlineDate === null
        ) {
          if (
            createBpForm.file_id === null &&
            createBpForm.deadlineDate === null
          ) {
            fetch(
              `${API}/businessProcess?name=${createBpForm.name}&initiator_id=${createBpForm.initiator_id}&project_id=${createBpForm.project_id}&tasks=1|2|3`,
              {
                method: "POST",
                headers: {
                  secret_token: document.cookie.replace(
                    /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  ),
                },
              }
            ).then((res) => console.log(res));
          }
          if (
            createBpForm.file_id === null &&
            createBpForm.deadlineDate !== null
          ) {
            fetch(
              `${API}/businessProcess?name=${createBpForm.name}&initiator_id=${
                createBpForm.initiator_id
              }&project_id=${createBpForm.project_id}&deadline=${
                createBpForm.deadlineDate + " " + createBpForm.deadlineTime
              }&tasks=1|2|3`,
              {
                method: "POST",
                headers: {
                  secret_token: document.cookie.replace(
                    /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  ),
                },
              }
            ).then((res) => console.log(res));
          }
          if (
            createBpForm.deadlineDate === null &&
            createBpForm.file_id !== null
          ) {
            fetch(
              `${API}/businessProcess?name=${createBpForm.name}&initiator_id=${createBpForm.initiator_id}&project_id=${createBpForm.project_id}&tasks=1|2|3&file_id=${createBpForm.file_id}`,
              {
                method: "POST",
                headers: {
                  secret_token: document.cookie.replace(
                    /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  ),
                },
              }
            ).then((res) => console.log(res));
          }
        }
        if (
          createBpForm.file_id !== null &&
          createBpForm.deadlineDate !== null
        ) {
          fetch(
            `${API}/businessProcess?name=${createBpForm.name}&initiator_id=${
              createBpForm.initiator_id
            }&project_id=${createBpForm.project_id}&deadline=${
              createBpForm.deadlineDate + " " + createBpForm.deadlineTime
            }&tasks=1|2|3&file_id=${createBpForm.file_id}`,
            {
              method: "POST",
              headers: {
                secret_token: document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
              },
            }
          ).then((res) => console.log(res));
        }
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

  console.log(projects);

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
                Шаблон
              </label>

              <select
                className="input-form"
                onChange={(e) => {
                  if (e.target.value.trim() === "") {
                    setCreateBpForm({ ...createBpForm, sample: null });
                  } else {
                    setCreateBpForm({
                      ...createBpForm,
                      sample: e.target.value,
                    });
                  }
                }}
              >
                <option>Без шаблона</option>
                <option value={"договор"}>Шаблон по параметрам Договора</option>
                <option value={"work"}>
                  Шаблон по параметрам Приема на работу
                </option>
                <option value={"dismissal"}>
                  Шаблон по параметрам Увольнения
                </option>
              </select>
            </div>
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
                  } else {
                    setCreateBpForm({
                      ...createBpForm,
                      project_id: e.target.value,
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
          {createBpForm.sample === "work" ? <BpResultFormWork /> : <></>}
          {createBpForm.sample === "dismissal" ? (
            <BpResultFormDismissal />
          ) : (
            <></>
          )}
          {createBpForm.sample === "договор" ? <BpResultFormTreaty /> : <></>}
        </div>
        <div>
          <button
            className={accessNext}
            id="bussines-next"
            onClick={() => saveBp()}
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
