import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../../context/status.js";
import { ClickAwayListener } from "@mui/base";
import "./BpItemMenu.scss";
import axios from "axios";

const BpItemMenu = ({ id }) => {
  const {
    idBp,
    setIdBp,
    apiBp,
    bpList,
    setCreateTaskStatus,
    setAddTasksMenu,
    setTasks,
    thisBp,
    setThisBp,
    tasksList,
    setTasksList,
    start,
    setStart,
    setOpenTasks,
    setIdCallBp,
    setContractBp,
    setOpenMenuBp,
    setOpenMenuTasks,
    setBpResultStatus,
    setBpCall,
    setDepsTasksArr,
  } = useContext(StatusContext);
  const [tasksBpSample, setTasksBpSample] = useState([]);
  const [tasksBpSampleResponse, setTasksBpSampleResponse] = useState([]);

  useEffect(() => {
    bpList.filter((el) => {
      if (el.id === idBp) {
        return setThisBp(el);
      }
      return false;
    });
  }, [idBp]);

  useEffect(() => {
    if (!!thisBp.id) {
      let a = thisBp.tasks.map((el) => el.original_id);
      let b = thisBp.tasks.map((el) => {
        return { name: el.name, id: el.original_id };
      });
      setDepsTasksArr(b);
      setTasks(a);
    }
  }, [thisBp]);

  const createSample = () => {
    let tasksBp = [];
    thisBp.tasks.map((task) => tasksBp.push(task.original_id));
    const getTasks = tasksBp.map((el) => {
      return axios.get(`https://test.easy-task.ru/api/v1/tasks/${el}`, {
        headers: {
          Authorization:
            "Bearer " +
            document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            ),
          "company-id": 1,
        },
      });
    });
    Promise.all(getTasks).then((res) => setTasksBpSample(res));
  };

  useEffect(() => {
    if (tasksBpSample.length > 0) {
      let sampleTasks = [];
      let tasksBpSampleReq = [];

      tasksBpSample.map((i) => {
        sampleTasks.push(i.data.data.id);
        tasksBpSampleReq.push({
          begin: i.data.data.begin,
          cyclic_task_id: i.data.data.cyclic_task_id,
          description: i.data.data.description,
          end: i.data.data.end,
          executor_id: i.data.data.executor_id,
          name: i.data.data.name,
          next_id: i.data.data.next_id,
          parent_id: i.data.data.parent_id,
          prev_id: i.data.data.prev_id,
          priority_id: 2,
          project_id: i.data.data.project_id,
          project_section_id: i.data.data.project_section_id,
          provide_to: 0,
          status_id: 19,
          task_load: 5,
          work_load: 35,
          workflow_id: 1,
        });
      });

      const createSampleTasks = tasksBpSampleReq.map((el) => {
        return axios.post(
          `https://test.easy-task.ru/api/v1/tasks`,
          { ...el, next_id: null, parent_id: null, prev_id: null },
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
      });
      Promise.all(createSampleTasks).then((res) => {
        setTasksBpSampleResponse(res);
        let arrs = [];
        res.map((el) => arrs.push(el.data.data.id));
        tasksBpSampleReq.map((el, i) => {
          if (el.next_id) {
            let idSample = sampleTasks.filter((e) => e === el.next_id)[0];
            let id;
            sampleTasks.map((item, a) => {
              if (item === idSample) {
                return (id = a);
              }
            });
            axios.patch(
              `https://test.easy-task.ru/api/v1/tasks/${arrs[i]}`,
              { next_id: arrs[id] },
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
          if (el.parent_id) {
            let idSample = sampleTasks.filter((e) => e === el.parent_id)[0];
            let id;
            sampleTasks.map((item, a) => {
              if (item === idSample) {
                return (id = a);
              }
            });
            axios.patch(
              `https://test.easy-task.ru/api/v1/tasks/${arrs[i]}`,
              { parent_id: arrs[id] },
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
          if (el.prev_id) {
            let idSample = sampleTasks.filter((e) => e === el.prev_id)[0];
            let id;
            sampleTasks.map((item, a) => {
              if (item === idSample) {
                return (id = a);
              }
            });
            axios.patch(
              `https://test.easy-task.ru/api/v1/tasks/${arrs[i]}`,
              { prev_id: arrs[id] },
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
  }, [tasksBpSample]);

  useEffect(() => {
    if (tasksBpSampleResponse.length > 0) {
      let arrTaskFromReq = [];
      tasksBpSampleResponse.map((el) =>
        arrTaskFromReq.push({
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
        })
      );

      axios.post(
        `${apiBp}/addBusinessProcessWithOptions`,
        {
          type: thisBp.type,
          businessProcess: {
            name: thisBp.name,
            initiator_id: thisBp.initiator_id,
            project_id: thisBp.project_id,
            project_section_id: thisBp.project_section_id,
            deadline: thisBp.deadline,
            is_runned: thisBp.is_runned,
            status: thisBp.status,
          },
          tasks: arrTaskFromReq,
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
  }, [tasksBpSampleResponse]);

  const makeActiveTasks = () => {
    const getTasks = thisBp.tasks.map((item) => {
      const link = `https://test.easy-task.ru/api/v1/tasks/${item.original_id}`;
      return axios.get(link, {
        headers: {
          Authorization:
            "Bearer " +
            document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            ),
        },
      });
    });
    setStart(true);
    Promise.all(getTasks).then((results) => setTasksList(results));
  };

  useEffect(() => {
    if (
      start &&
      tasksList.length > 0 &&
      parseInt(tasksList[0]?.data.data.status_id) !== 50
    ) {
      let arr = tasksList.map((el) => {
        return {
          ...el,
          data: {
            ...el.data,
            data: {
              ...el.data.data,
              status_id: 50,
            },
          },
        };
      });
      setTasksList(arr);
    }
    if (start && parseInt(tasksList[0]?.data.data.status_id) === 50) {
      setOpenTasks("business-item-" + idBp);
      setStart(false);
    }
  }, [tasksList, start]);

  const showResult = () => {
    setIdCallBp(thisBp.id);
    setContractBp(thisBp.id);
    setOpenTasks("business-item-" + thisBp.id);
    setBpCall(2);
    setOpenMenuBp(true);
    setOpenMenuTasks(false);
    setBpResultStatus(true);
  };

  if (idBp === id) {
    return (
      <ClickAwayListener onClickAway={() => setIdBp("")}>
        <div className="bp-item-menu" onClick={(e) => e.stopPropagation()}>
          <ul>
            {thisBp.status === 0 ||
            thisBp.status === 3 ||
            thisBp.status === 4 ||
            thisBp.status === 5 ? (
              thisBp.type !== 1 && thisBp.type !== 2 && thisBp.type !== 3 ? (
                <li
                  onClick={() => {
                    setIdBp("");
                    setCreateTaskStatus(true);
                    setAddTasksMenu(true);
                  }}
                >
                  Добавить задачу
                </li>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {thisBp.status === 0 ||
            thisBp.status === 3 ||
            thisBp.status === 4 ||
            thisBp.status === 5 ? (
              thisBp.type !== 1 && thisBp.type !== 2 && thisBp.type !== 3 ? (
                <li
                  onClick={() => {
                    setTasksList([]);
                    makeActiveTasks();
                  }}
                >
                  Запустить с...
                </li>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {thisBp.type === 1 || thisBp.type === 2 || thisBp.type === 3 ? (
              <li onClick={() => showResult()}>Показать результаты</li>
            ) : (
              <></>
            )}

            <li>Распечатать</li>
            {thisBp.type !== 1 && thisBp.type !== 2 && thisBp.type !== 3 ? (
              <li onClick={() => createSample()}>Сохранить как шаблон</li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </ClickAwayListener>
    );
  }
};

export default BpItemMenu;
