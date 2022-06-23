import React, { useContext } from "react";
import { StatusContext } from "../../../context/status.js";
import { ClickAwayListener } from "@mui/base";
import "./BpItemMenu.scss";

const BpItemMenu = ({ id }) => {
  const { idBp, setIdBp } = useContext(StatusContext);

  const createSample = () => {
    fetch(`http://185.182.111.115/api/v1/businessProcess/${idBp}/makeSample`, {
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
            <li>Добавить задачу</li>
            <li>Запустить с...</li>
            <li>Показать результаты</li>
            <li>Распечатать</li>
            <li onClick={() => createSample()}>Сохранить как шаблон</li>
          </ul>
        </div>
      </ClickAwayListener>
    );
  }
};

export default BpItemMenu;
