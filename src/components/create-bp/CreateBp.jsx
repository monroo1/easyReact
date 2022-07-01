import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";
import BpResultFormDismissal from "../bp-result-form-dismissal/BpResultFormDismissal";
import BpResultFormWork from "../bp-result-form-work/BpResultFormWork";
import Treaty from "../bp-result-form-treaty/Treaty.jsx";

import "./CreateBp.scss";

const CreateBp = () => {
  const {
    apiBp,
    bearer,
    setCreateBpStatus,
    createBpForm,
    setCreateBpForm,
    setCreateTaskStatus,
    createTaskForm,
    setCreateTaskForm,
    createBpStatus,
    createBpSampleStatus,
    setCreateBpSampleStatus,
    createBpSampleForm,
    setCreateBpSampleForm,
    createBpSampleFormDate,
    setCreateBpSampleFormDate,
    createBpSampleFormOptions,
    setCreateTaskSampleFormStatus,
    idSample,
    setIdSample,
    sampleArr,
    setSampleArr,
    setStatusCreateTask,
    tasksArr,
    setTasksArr,
    setNowBp,
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

  const submitFileSample = (e) => {
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

  const nextBpSample = () => {
    if (!createBpSampleStatus) {
      console.log("aaa");
      nextCreateTasks();
    } else {
      console.log("Da");
      setCreateBpStatus(false);
      setCreateBpSampleStatus(false);
      setCreateTaskStatus(true);
      setCreateTaskSampleFormStatus(true);
      setStatusCreateTask(true);
    }
  };

  const saveBpSample = () => {
    setCreateTaskSampleFormStatus(false);
    setCreateBpStatus(false);
    setCreateBpSampleStatus(false);
    setNowBp({});

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
            setCreateBpSampleForm({
              type: 0,
              businessProcess: {
                name: null,
                deadline: null,
                project_id: null,
                tasks: 1,
                initiator_id: document.cookie.replace(
                  /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
              },
              options: [],
            });
            // console.log(r.businessProcess.tasks);
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
          setCreateBpSampleForm({
            type: 0,
            businessProcess: {
              name: null,
              deadline: null,
              project_id: null,
              tasks: 1,
              initiator_id: document.cookie.replace(
                /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
            },
            options: [],
          });
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
      if (
        !!createBpSampleFormDate.deadlineDate &&
        !!createBpSampleFormDate.deadlineTime
      ) {
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
      } else if (
        !!createBpSampleFormDate.deadlineDate &&
        !createBpSampleFormDate.deadlineTime
      ) {
        setCreateBpSampleForm({
          ...createBpSampleForm,
          businessProcess: {
            ...createBpSampleForm.businessProcess,
            deadline: createBpSampleFormDate.deadlineDate + " 00:00:00",
          },
        });
      } else if (
        !createBpSampleFormDate.deadlineDate &&
        !!createBpSampleFormDate.deadlineTime
      ) {
        let date = new Date();
        date.setDate(date.getDate() + 30);
        setCreateBpSampleForm({
          ...createBpSampleForm,
          businessProcess: {
            ...createBpSampleForm.businessProcess,
            deadline:
              date.getFullYear() +
              "-" +
              date.getMonth() +
              "-" +
              date.getDate() +
              " 00:00:00",
          },
        });
      }
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
      console.log(bp);
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

  if (createBpStatus === true) {
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
                    if (e.target.value !== "Без шаблона") {
                      setCreateBpSampleStatus(true);
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
                    } else {
                      setCreateBpSampleStatus(false);
                      setCreateBpSampleForm({
                        ...createBpSampleForm,
                        type: 0,
                      });
                    }
                  }}
                >
                  <option>Без шаблона</option>
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
                      setCreateBpForm({ ...createBpForm, name: null });
                      setCreateBpSampleForm({
                        ...createBpSampleForm,
                        businessProcess: {
                          ...createBpSampleForm.businessProcess,
                          name: null,
                        },
                      });
                    } else {
                      setCreateBpForm({
                        ...createBpForm,
                        name: e.target.value,
                      });
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
                    setCreateBpForm({
                      ...createBpForm,
                      project_id: parseInt(e.target.value),
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
              {!createBpSampleStatus ? (
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
                      if (e.target.value.trim() === "") {
                        setCreateBpForm({
                          ...createBpForm,
                          initiator_id: parseInt(
                            document.cookie.replace(
                              /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                              "$1"
                            )
                          ),
                        });
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
                        setCreateBpForm({
                          ...createBpForm,
                          deadlineDate: null,
                        });
                        setCreateBpSampleFormDate({
                          ...createBpSampleFormDate,
                          deadlineDate: null,
                        });
                      } else {
                        setCreateBpForm({
                          ...createBpForm,
                          deadlineDate: e.target.value,
                        });
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
                        setCreateBpForm({
                          ...createBpForm,
                          deadlineTime: null,
                        });
                        setCreateBpSampleFormDate({
                          ...createBpSampleFormDate,
                          deadlineTime: null,
                        });
                      } else {
                        setCreateBpForm({
                          ...createBpForm,
                          deadlineTime: e.target.value,
                        });
                        setCreateBpSampleFormDate({
                          ...createBpSampleFormDate,
                          deadlineTime: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
              </div>
              {!createBpSampleStatus || createBpSampleForm.type === 0 ? (
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
            {createBpSampleForm.type === 1 ? <Treaty /> : <></>}
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
                onClick={(e) => {
                  e.stopPropagation();
                  return nextBpSample();
                }}
              >
                Далее
              </button>
            )}
            <button
              className="defualt__btn"
              id="close-btn"
              onClick={() => {
                setCreateBpStatus(false);
                setCreateBpForm({
                  name: null,
                  initiator_id: parseInt(
                    document.cookie.replace(
                      /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                      "$1"
                    )
                  ),
                  project_id: null,
                  deadlineDate: null,
                  deadlineTime: null,
                  tasks: null,
                  sample: null,
                  file_id: null,
                });
                setCreateBpSampleStatus(false);
                setCreateBpSampleForm({
                  type: 0,
                  businessProcess: {
                    name: null,
                    deadline: null,
                    project_id: null,
                    tasks: 1,
                    initiator_id: document.cookie.replace(
                      /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                      "$1"
                    ),
                  },
                  options: [],
                });
                setCreateTaskSampleFormStatus(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default CreateBp;
