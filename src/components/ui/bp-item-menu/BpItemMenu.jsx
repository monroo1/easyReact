import React, { useContext } from "react";
import { StatusContext } from "../../../context/status.js";
import { ClickAwayListener } from "@mui/base";
import "./BpItemMenu.scss";
import { useState } from "react";
import { useEffect } from "react";

const BpItemMenu = ({ id }) => {
  const { idBp, setIdBp, apiBp, bpList, setCreateTaskStatus } =
    useContext(StatusContext);
  const [thisBp, setThisBp] = useState({});

  useEffect(() => {
    bpList.filter((el) => {
      if (el.id === idBp) {
        return setThisBp(el);
      }
    });
  }, [idBp]);

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
              <li onClick={() => setCreateTaskStatus(true)}>Добавить задачу</li>
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
