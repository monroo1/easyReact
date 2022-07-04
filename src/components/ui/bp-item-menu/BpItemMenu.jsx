import React, { useContext, useEffect } from "react";
import { StatusContext } from "../../../context/status.js";
import { ClickAwayListener } from "@mui/base";
import "./BpItemMenu.scss";

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

  if (idBp === id) {
    return (
      <ClickAwayListener onClickAway={() => setIdBp("")}>
        <div className="bp-item-menu">
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

            <li>Запустить с...</li>
            <li>Показать результаты</li>
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
