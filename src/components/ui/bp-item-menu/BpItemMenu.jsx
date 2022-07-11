import React, { useContext, useEffect } from "react";
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
    setResultDropStatus,
  } = useContext(StatusContext);

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
      let a = thisBp.tasks.map((el) => el.id);
      setTasks(a);
    }
  }, [thisBp]);

  const createSample = () => {
    fetch(`${apiBp}/businessProcess/${idBp}/makeSample`, {
      method: "PATCH",
      headers: {
        "secret-token": document.cookie.replace(
          /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        ),
      },
    }).then((res) => console.log(res));
  };

  const makeActiveTasks = () => {
    const getTasks = thisBp.tasks.map((item) => {
      const link = `https://test.easy-task.ru/api/v1/tasks/${item.id}`;
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
      tasksList[0]?.data.data.status_id != 50
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
    if (start && tasksList[0]?.data.data.status_id == 50) {
      setOpenTasks("business-item-" + idBp);
      setStart(false);
    }
  }, [tasksList, start]);

  const showResult = () => {
    setIdBp("");
    setResultDropStatus("business-item-" + idBp);
  };

  if (idBp === id) {
    return (
      <ClickAwayListener onClickAway={() => setIdBp("")}>
        <div className="bp-item-menu" onClick={(e) => e.stopPropagation()}>
          <ul>
            {thisBp.status === 0 ||
            thisBp.status === 1 ||
            thisBp.status === 7 ? (
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
            )}
            {thisBp.status === 0 || thisBp.status === 1 ? (
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
            )}
            {!!thisBp.options && thisBp.options.length > 0 ? (
              <li onClick={() => showResult()}>Показать результаты</li>
            ) : (
              <></>
            )}
            <li>Распечатать</li>
            {thisBp.status === 0 ||
            thisBp.status === 1 ||
            thisBp.status === 2 ? (
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
