import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";
import axios from "axios";

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
    setSampleArr,
    setIdSample,
    sampleArr,
    setStatusCreateTask,
    setTasksArr,
    setNowBp,
    contract,
    setContract,
    setContractLast,
    contractLast,
    file,
    setFile,
    projects,
    setProjects,
  } = useContext(StatusContext);

  const [accessNext, setAccessNext] = useState("blue-btn blue-btn__disabled");
  const [nextLinkProjects, setNextLinkProjects] = useState(
    "https://test.easy-task.ru/api/v1/projects"
  );

  const [projectSections, setProjectSections] = useState([]);
  const [taskSampleArr, setTaskSampleArr] = useState([]);

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
        setCreateBpSampleForm({
          ...createBpSampleForm,
          businessProcess: {
            ...createBpSampleForm.businessProcess,
            file_id: res.data.id,
          },
        });
        setFile({ name: res.data.original_name });
      })
      .catch((err) => {
        console.log(err);
      });
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
      if (
        createBpForm.name !== null &&
        createBpForm.project_id !== null &&
        createBpForm.project_section_id !== null
      ) {
        setCreateBpStatus(false);
        setCreateTaskStatus(true);
      }
    } else {
      setCreateBpStatus(false);
      setCreateBpSampleStatus(false);
      setCreateTaskStatus(true);
      setCreateTaskSampleFormStatus(true);
      setStatusCreateTask(true);
    }
  };

  const saveBpSample = () => {
    setNowBp({});
    setCreateTaskSampleFormStatus(false);
    setCreateBpStatus(false);
    setCreateBpSampleStatus(false);

    const createTasks = contractLast.tasks.map((task, i) => {
      if (i === 0) {
        if (
          createBpSampleForm.type === 1 ||
          createBpSampleForm.type === 2 ||
          createBpSampleForm.type === 3
        ) {
          return axios.post(
            "https://test.easy-task.ru/api/v1/tasks",
            {
              ...task,
              status_id: 3,
              next_id: null,
              parent_id: null,
              prev_id: null,
            },
            {
              headers: {
                Authorization:
                  "Bearer " +
                  document.cookie.replace(
                    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  ),
                "company-id": 1,
              },
            }
          );
        } else {
          return axios.post(
            "https://test.easy-task.ru/api/v1/tasks",
            { ...task, next_id: null, parent_id: null, prev_id: null },
            {
              headers: {
                Authorization:
                  "Bearer " +
                  document.cookie.replace(
                    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  ),
                "company-id": 1,
              },
            }
          );
        }
      } else {
        return axios.post(
          "https://test.easy-task.ru/api/v1/tasks",
          { next_id: null, ...task, parent_id: null, prev_id: null },
          {
            headers: {
              Authorization:
                "Bearer " +
                document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
              "company-id": 1,
            },
          }
        );
      }
    });
    Promise.all(createTasks).then((res) => {
      let taskArr = [];
      if (
        createBpSampleForm.type === 1 ||
        createBpSampleForm.type === 2 ||
        createBpSampleForm.type === 3
      ) {
        res.map((el, i) => {
          taskArr.push({
            name: el.data.data.name,
            executor_id: el.data.data.executor_id,
            deadline:
              el.data.data.end.split(" ")[0].split("-")[2] +
              "." +
              el.data.data.end.split(" ")[0].split("-")[1] +
              "." +
              el.data.data.end.split(" ")[0].split("-")[0] +
              " " +
              el.data.data.end.split(" ")[1],
            description: el.data.data.description,
            original_id: el.data.data.id,
            results: contract.tasks[i].results,
          });
        });
      } else {
        let arr = [];
        let arrSample = [];
        contract.tasks.map((el) => arrSample.push(el.original_id));

        res.map((el) => {
          arr.push(el.data.data.id);
          taskArr.push({
            name: el.data.data.name,
            executor_id: el.data.data.executor_id,
            deadline:
              el.data.data.end.split(" ")[0].split("-")[2] +
              "." +
              el.data.data.end.split(" ")[0].split("-")[1] +
              "." +
              el.data.data.end.split(" ")[0].split("-")[0] +
              " " +
              el.data.data.end.split(" ")[1],
            original_id: el.data.data.id,
          });
        });

        contract.tasks.map((t, i) => {
          axios
            .get(`https://test.easy-task.ru/api/v1/tasks/${t.original_id}`, {
              headers: {
                Authorization:
                  "Bearer " +
                  document.cookie.replace(
                    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  ),
                "company-id": 1,
              },
            })
            .then((res) => {
              if (res.data.data.next_id) {
                let idSample = arrSample.filter(
                  (e) => e === res.data.data.next_id
                )[0];
                let id;
                arrSample.map((item, a) => {
                  if (item === idSample) {
                    return (id = a);
                  }
                });
                axios.patch(
                  `https://test.easy-task.ru/api/v1/tasks/${arr[i]}`,
                  { next_id: arr[id] },
                  {
                    headers: {
                      Authorization:
                        "Bearer " +
                        document.cookie.replace(
                          /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                          "$1"
                        ),
                      "company-id": 1,
                    },
                  }
                );
              }
              if (res.data.data.parent_id) {
                let idSample = arrSample.filter(
                  (e) => e === res.data.data.parent_id
                )[0];
                let id;
                arrSample.map((item, a) => {
                  if (item === idSample) {
                    return (id = a);
                  }
                });
                axios.patch(
                  `https://test.easy-task.ru/api/v1/tasks/${arr[i]}`,
                  { parent_id: arr[id] },
                  {
                    headers: {
                      Authorization:
                        "Bearer " +
                        document.cookie.replace(
                          /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                          "$1"
                        ),
                      "company-id": 1,
                    },
                  }
                );
              }
              if (res.data.data.prev_id) {
                let idSample = arrSample.filter(
                  (e) => e === res.data.data.prev_id
                )[0];
                let id;
                arrSample.map((item, a) => {
                  if (item === idSample) {
                    return (id = a);
                  }
                });
                axios.patch(
                  `https://test.easy-task.ru/api/v1/tasks/${arr[i]}`,
                  { prev_id: arr[id] },
                  {
                    headers: {
                      Authorization:
                        "Bearer " +
                        document.cookie.replace(
                          /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                          "$1"
                        ),
                      "company-id": 1,
                    },
                  }
                );
              }
            });
        });
      }

      setTaskSampleArr(taskArr);
    });
  };

  useEffect(() => {
    if (taskSampleArr.length > 0) {
      if (
        createBpSampleForm.type === 1 ||
        createBpSampleForm.type === 2 ||
        createBpSampleForm.type === 3
      ) {
        axios
          .post(
            `${apiBp}/addBusinessProcessWithOptions`,
            {
              type: contractLast.type,
              businessProcess: {
                name: contractLast.businessProcess.name,
                initiator_id: document.cookie.replace(
                  /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
                project_id: contractLast.businessProcess.project_id,
                project_section_id:
                  contractLast.businessProcess.project_section_id,
                deadline: contractLast.businessProcess.deadline,
                is_sample: contractLast.businessProcess.is_sample,
                is_runned: contractLast.businessProcess.is_runned,
                status: contractLast.businessProcess.status,
              },
              tasks: taskSampleArr,
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
            fetch(`${apiBp}/task/${res.data.tasks[0].id}?status=7`, {
              method: "PATCH",
              headers: {
                "secret-token": document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
              },
            }).catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        axios.post(
          `${apiBp}/businessProcess`,
          {
            type: 0,
            businessProcess: {
              name: createBpSampleForm.businessProcess.name,
              initiator_id: createBpSampleForm.businessProcess.initiator_id,
              project_id: createBpSampleForm.businessProcess.project_id,
              project_section_id:
                createBpSampleForm.businessProcess.project_section_id,
              deadline: createBpSampleForm.businessProcess.deadline,
              tasks: taskSampleArr,
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
        );
      }

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
      setTasksArr([]);
    }
  }, [taskSampleArr]);

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
        if (!!contract) {
          setContract({
            ...contract,
            businessProcess: {
              ...contract.businessProcess,
              deadline:
                createBpSampleFormDate.deadlineDate +
                " " +
                createBpSampleFormDate.deadlineTime +
                ":00",
            },
          });
        }
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
        if (!!contract) {
          setContract({
            ...contract,
            businessProcess: {
              ...contract.businessProcess,
              deadline: createBpSampleFormDate.deadlineDate + " 00:00:00",
            },
          });
        }
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
        if (!!contract) {
          setContract({
            ...contract,
            businessProcess: {
              ...contract.businessProcess,
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
    if (!!createBpForm.project_id) {
      axios
        .get(
          `https://test.easy-task.ru/api/v1/projects/${createBpForm.project_id}`,
          {
            headers: {
              Authorization: "Bearer " + bearer,
            },
          }
        )
        .then((res) => {
          setProjectSections(res.data.data.sections);
        });
    }
  }, [createBpForm.project_id]);

  useEffect(() => {
    if (createBpSampleForm.type === 0) {
      let bp = sampleArr.filter((el) => el.id === parseInt(idSample));
      bp = bp[0];
      setContract(bp);
    }

    if (createBpSampleForm.type === 1) {
      axios
        .get(`${apiBp}/getSampleFile/contract`, {
          headers: {
            "secret-token": document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            ),
          },
        })
        .then((res) => {
          setContract(res.data);
          localStorage.setItem("treaty", JSON.stringify(res.data));
        });
    }

    if (createBpSampleForm.type === 3) {
      axios
        .get(`${apiBp}/getSampleFile/recruitment`, {
          headers: {
            "secret-token": document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            ),
          },
        })
        .then((res) => {
          setContract(res.data);
          localStorage.setItem("recruitment", JSON.stringify(res.data));
        });
    }

    if (createBpSampleForm.type === 2) {
      axios
        .get(`${apiBp}/getSampleFile/dismissal`, {
          headers: {
            "secret-token": document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            ),
          },
        })
        .then((res) => {
          setContract(res.data);
          localStorage.setItem("dismissal", JSON.stringify(res.data));
        });
    }
  }, [idSample]);

  useEffect(() => {
    if (
      contract &&
      createBpSampleForm.type !== 0 &&
      createBpSampleForm.type !== null
    ) {
      setContractLast({ ...contract, tasks: [] });
      setCreateBpSampleForm({
        ...createBpSampleForm,
        businessProcess: {
          ...createBpSampleForm.businessProcess,
          name: contract.businessProcess.name,
        },
      });
    }
    if (contract && createBpSampleForm.type === 0) {
      setContractLast({ ...contract, tasks: [] });
    }
  }, [contract]);

  if (createBpStatus === true) {
    return (
      <div className="business__drop-content">
        <div id="business" className="businessClass">
          <div>
            <p className="business__drop-content__title p__drop-content">
              * - ???????????????????????? ?????? ???????????????????? ????????
            </p>
            <form id="new-bp__form">
              <div>
                <label className="p__drop-content" htmlFor="input-name">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  ????????????
                </label>

                <select
                  className="input-form"
                  value={!!idSample ? idSample : ""}
                  onChange={(e) => {
                    if (e.target.value !== "?????? ??????????????") {
                      setCreateBpSampleStatus(true);
                      if (
                        e.target.value === "1" ||
                        e.target.value === "2" ||
                        e.target.value === "3"
                      ) {
                        setIdSample(parseInt(e.target.value));
                        setCreateBpSampleForm({
                          ...createBpSampleForm,
                          type: parseInt(e.target.value),
                        });
                      } else {
                        setIdSample(parseInt(e.target.value));
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
                  <option value="">?????? ??????????????</option>
                  <option value="1">??????????????</option>
                  <option value="2">????????????????????</option>
                  <option value="3">???????????????? ???? ????????????</option>
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
                  ????????????????*
                </label>
                <input
                  className="input-form"
                  type="text"
                  id="input-name"
                  disabled={
                    createBpSampleForm.type !== 0 &&
                    createBpSampleForm.type !== null
                  }
                  value={
                    createBpSampleForm.businessProcess.name
                      ? createBpSampleForm.businessProcess.name
                      : ""
                  }
                  onChange={(e) => {
                    if (!!contract) {
                      setContract({
                        ...contract,
                        businessProcess: {
                          ...contract.businessProcess,
                          name: e.target.value,
                        },
                      });
                    }
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
                  ????????????*
                </label>
                <select
                  className="input-form"
                  value={
                    createBpSampleForm.businessProcess.project_id
                      ? createBpSampleForm.businessProcess.project_id
                      : ""
                  }
                  onChange={(e) => {
                    if (!!contract) {
                      setContract({
                        ...contract,
                        businessProcess: {
                          ...contract.businessProcess,
                          project_id: parseInt(e.target.value),
                        },
                      });
                    }
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
                  <option value={null}>??????????????</option>
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
                <label
                  className="p__drop-content"
                  htmlFor="input-project-section"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  ???????????? ??????????????*
                </label>
                <select
                  id="input-project-section"
                  className="input-form"
                  disabled={!createBpForm.project_id ? true : false}
                  value={
                    createBpSampleForm.businessProcess.project_section_id
                      ? createBpSampleForm.businessProcess.project_section_id
                      : ""
                  }
                  onChange={(e) => {
                    if (!!contract) {
                      setContract({
                        ...contract,
                        businessProcess: {
                          ...contract.businessProcess,
                          project_section_id: parseInt(e.target.value),
                        },
                      });
                    }
                    setCreateBpSampleForm({
                      ...createBpSampleForm,
                      businessProcess: {
                        ...createBpSampleForm.businessProcess,
                        project_section_id: parseInt(e.target.value),
                      },
                    });
                    setCreateBpForm({
                      ...createBpForm,
                      project_section_id: parseInt(e.target.value),
                    });
                    setCreateTaskForm({
                      ...createTaskForm,
                      project_section_id: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value={null}>??????????????</option>
                  {projectSections.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* {!createBpSampleStatus ? (
                <div>
                  <label className="p__drop-content" htmlFor="input-initiator">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/input/User.svg`}
                      alt="User"
                    />
                    ??????????????????
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
                      if (!!contract) {
                        setContract({
                          ...contract,
                          businessProcess: {
                            ...contract.businessProcess,
                            initiator_id: parseInt(
                              document.cookie.replace(
                                /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                                "$1"
                              )
                            ),
                          },
                        });
                      }
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
                    <option>??????????????</option>
                  </select>
                </div>
              ) : (
                <></>
              )} */}

              <div className="input__date">
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
                    alt="CalendarBlank"
                  />
                  ?????????? ????????
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
                    ???????????????????? ????????
                  </label>
                  {!!file.name ? (
                    <div className="file-download">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/FilePlus.png`}
                        alt=""
                      />
                      {file.name}
                    </div>
                  ) : (
                    <>
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
                        ??????????????
                      </label>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </form>
          </div>
          <div>
            {!!contractLast ? (
              contractLast.tasks.length > 0 ? (
                <button
                  className={accessNext}
                  id="bussines-next"
                  onClick={() => saveBpSample()}
                >
                  ??????????????????
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
                  ??????????
                </button>
              )
            ) : (
              <button
                className={accessNext}
                id="bussines-next"
                onClick={(e) => {
                  e.stopPropagation();
                  return nextBpSample();
                }}
              >
                ??????????
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
              ????????????
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default CreateBp;
