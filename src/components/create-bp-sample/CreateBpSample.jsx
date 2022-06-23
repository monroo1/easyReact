import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StatusContext } from "../../context/status";
import BpResultFormDismissal from "../bp-result-form-dismissal/BpResultFormDismissal";
import BpResultFormWork from "../bp-result-form-work/BpResultFormWork";
import BpResultFormTreaty from "../bp-result-form-treaty/BpResultFormTreaty";
import "../create-bp/CreateBp.scss";

const CreateBp = () => {
  const {
    apiBp,
    setCreateBpForm,
    bearer,
    createTaskForm,
    setCreateTaskForm,
    setCreateBpSampleStatus,
    createBpSampleForm,
    setCreateBpSampleForm,
    createBpSampleFormDate,
    setCreateBpSampleFormDate,
    createBpSampleFormOptions,
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
        setCreateBpSampleForm({ ...createBpSampleForm, file_id: res.data.id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveBpSample = () => {
    axios
      .post(
        `${apiBp}/addBusinessProcessWithOptions`,
        {
          ...createBpSampleForm,
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let arr = [];
    for (let i in createBpSampleFormOptions) {
      if (createBpSampleFormOptions[i]?.optionId) {
        arr.push(createBpSampleFormOptions[i]);
      }
    }
    setCreateBpSampleForm({ ...createBpSampleForm, options: arr });
  }, [createBpSampleFormOptions]);

  useEffect(() => {
    if (!!createBpSampleFormDate) {
      setCreateBpSampleForm({
        ...createBpSampleForm,
        businessProcess: {
          ...createBpSampleForm.businessProcess,
          deadline:
            createBpSampleFormDate.deadlineDate +
            " " +
            createBpSampleFormDate.deadlineTime +
            ":00",
        },
      });
    }
  }, [createBpSampleFormDate]);

  useEffect(() => {
    if (
      createBpSampleForm.businessProcess.name !== null &&
      createBpSampleForm.businessProcess.project_id !== null
    ) {
      setAccessNext("blue-btn");
    } else {
      setAccessNext("blue-btn blue-btn__disabled");
    }
  }, [createBpSampleForm]);

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
                Шаблон
              </label>

              <select
                className="input-form"
                onChange={(e) => {
                  console.log(e.target.value);
                  setCreateBpSampleForm({
                    ...createBpSampleForm,
                    type: parseInt(e.target.value),
                  });
                }}
                defaultValue={1}
              >
                <option value={1}>Шаблон по параметрам Договора</option>
                <option value={2}>Шаблон по параметрам Приема на работу</option>
                <option value={3}>Шаблон по параметрам Увольнения</option>
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
                    setCreateBpSampleForm({
                      ...createBpSampleForm,
                      businessProcess: {
                        ...createBpSampleForm.businessProcess,
                        name: null,
                      },
                    });
                  } else {
                    setCreateBpSampleForm({
                      ...createBpSampleForm,
                      businessProcess: {
                        ...createBpSampleForm.businessProcess,
                        name: e.target.value,
                      },
                    });
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
                  setCreateBpSampleForm({
                    ...createBpSampleForm,
                    businessProcess: {
                      ...createBpSampleForm.businessProcess,
                      project_id: parseInt(e.target.value),
                    },
                  });
                  setCreateTaskForm({
                    ...createTaskForm,
                    project_id: parseInt(e.target.value),
                  });
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
            {createBpSampleForm.type ? (
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
                    setCreateBpSampleForm({
                      ...createBpSampleForm,
                      businessProcess: {
                        ...createBpSampleForm.businessProcess,
                        initiator_id: e.target.value,
                      },
                    });
                  }}
                >
                  <option>Выбрать</option>
                </select>
              </div>
            ) : (
              <></>
            )}

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
                      setCreateBpSampleFormDate({
                        ...createBpSampleFormDate,
                        deadlineDate: null,
                      });
                    } else {
                      setCreateBpSampleFormDate({
                        ...createBpSampleFormDate,
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
                      setCreateBpSampleFormDate({
                        ...createBpSampleFormDate,
                        deadlineTime: null,
                      });
                    } else {
                      setCreateBpSampleFormDate({
                        ...createBpSampleFormDate,
                        deadlineTime: e.target.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
            {createBpSampleForm.type ? (
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
            ) : (
              <></>
            )}
          </form>
          {createBpSampleForm.type === 1 ? <BpResultFormTreaty /> : <></>}
          {createBpSampleForm.type === 2 ? <BpResultFormWork /> : <></>}
          {createBpSampleForm.type === 3 ? <BpResultFormDismissal /> : <></>}
        </div>
        <div>
          <button
            className={accessNext}
            id="bussines-next"
            onClick={() => saveBpSample()}
          >
            Далее
          </button>
          <button
            className="defualt__btn"
            id="close-btn"
            onClick={() => {
              setCreateBpSampleStatus(false);
              setCreateBpForm({});
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
