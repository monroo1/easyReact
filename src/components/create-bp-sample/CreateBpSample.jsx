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
    bearer,
    createTaskForm,
    setCreateTaskForm,
    setCreateBpSampleStatus,
    createBpSampleForm,
    setCreateBpSampleForm,
    createBpSampleFormDate,
    setCreateBpSampleFormDate,
    createBpSampleFormOptions,
    setCreateTaskSampleFormStatus,
    setCreateTaskStatus,
    idSample,
    setIdSample,
    sampleArr,
    setSampleArr,
    setStatusCreateTask,
    tasksArr,
    setTasksArr,
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
        setCreateBpSampleForm({
          ...createBpSampleForm,
          businessProcess: {
            ...createBpSampleForm.businessProcess,
            file_id: res.data.id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextBpSample = () => {
    setCreateBpSampleStatus(false);
    setCreateTaskSampleFormStatus(true);
    setCreateTaskStatus(true);
    setStatusCreateTask(true);
  };

  const saveBpSample = () => {
    setCreateBpSampleStatus(false);

    let tasksStr = "";
    for (let i in tasksArr) {
      tasksStr = tasksStr.concat(tasksArr[i]);
      if (i < tasksArr.length - 1) {
        tasksStr = tasksStr.concat("|");
      }
    }

    if (createBpSampleForm.type === 0) {
      if (createBpSampleForm.businessProcess.file_id) {
        fetch(
          `${apiBp}/businessProcess?name=${createBpSampleForm.businessProcess.name}&initiator_id=${createBpSampleForm.businessProcess.initiator_id}&project_id=${createBpSampleForm.businessProcess.project_id}&tasks=${tasksStr}&file_id=${createBpSampleForm.businessProcess.file_id}`,
          {
            method: "POST",
            headers: {
              "secret-token": document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setTasksArr([]);
            console.log(r.businessProcess.tasks);
          });
      } else {
        fetch(
          `${apiBp}/businessProcess?name=${createBpSampleForm.businessProcess.name}&initiator_id=${createBpSampleForm.businessProcess.initiator_id}&project_id=${createBpSampleForm.businessProcess.project_id}&tasks=${tasksStr}`,
          {
            method: "POST",
            headers: {
              "secret-token": document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setTasksArr([]);
            console.log(r.businessProcess.tasks);
          });
      }
    } else {
      axios
        .post(
          `${apiBp}/addBusinessProcessWithOptions`,
          {
            ...createBpSampleForm,
            businessProcess: {
              ...createBpSampleForm.businessProcess,
              tasks: tasksStr,
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
        .then((res) => {
          setCreateBpSampleStatus(false);
          setTasksArr([]);

          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
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

  useEffect(() => {
    axios
      .get(`${apiBp}/getSamples`, {
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
      })
      .then((res) => {
        setSampleArr(res.data.data);
      });
  }, []);

  useEffect(() => {
    if (createBpSampleForm.type === 0) {
      let bp = sampleArr.filter((el) => el.id === parseInt(idSample));
      bp = bp[0].businessProcessId;

      let tasksStr = "";
      for (let i in bp.tasks) {
        tasksStr = tasksStr.concat(bp.tasks[i].id);
        if (i < bp.tasks.length - 1) {
          tasksStr = tasksStr.concat("|");
        }
      }

      setCreateBpSampleForm({
        ...createBpSampleForm,
        businessProcess: {
          name: bp.name,
          initiator_id: parseInt(
            document.cookie.replace(
              /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            )
          ),
          project_id: parseInt(bp.project_id),
          tasks: tasksStr,
          deadline: bp.deadline,
        },
      });
    }
  }, [idSample]);

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
                  if (
                    e.target.value === "1" ||
                    e.target.value === "2" ||
                    e.target.value === "3"
                  ) {
                    setIdSample(e.target.value);
                    setCreateBpSampleForm({
                      ...createBpSampleForm,
                      type: parseInt(e.target.value),
                    });
                  } else {
                    setIdSample(e.target.value);
                    setCreateBpSampleForm({
                      ...createBpSampleForm,
                      type: 0,
                    });
                  }
                }}
              >
                {sampleArr.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
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
                value={
                  createBpSampleForm.businessProcess.name
                    ? createBpSampleForm.businessProcess.name
                    : ""
                }
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
                value={
                  createBpSampleForm.businessProcess.project_id
                    ? createBpSampleForm.businessProcess.project_id
                    : ""
                }
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
            {createBpSampleForm.type === 0 ? (
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
                  value={
                    createBpSampleForm.businessProcess.initiator_id
                      ? createBpSampleForm.businessProcess.initiator_id
                      : document.cookie.replace(
                          /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                          "$1"
                        )
                  }
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
            {createBpSampleForm.type === 0 ? (
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
          {tasksArr.length > 0 ? (
            <button
              className={accessNext}
              id="bussines-next"
              onClick={() => saveBpSample()}
            >
              Сохранить
            </button>
          ) : (
            <button
              className={accessNext}
              id="bussines-next"
              onClick={() => nextBpSample()}
            >
              Далее
            </button>
          )}

          <button
            className="defualt__btn"
            id="close-btn"
            onClick={() => {
              setCreateBpSampleStatus(false);
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
