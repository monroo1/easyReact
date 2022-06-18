import React, { useContext } from "react";
import { StatusContext } from "../../../context/status.js";
import { ClickAwayListener } from "@mui/base";
import "./BpItemMenu.scss";

const BpItemMenu = ({ id }) => {
  const { idBp, setIdBp } = useContext(StatusContext);

  if (idBp == id) {
    return (
      <ClickAwayListener onClickAway={() => setIdBp("")}>
        <div className="bp-item-menu">
          <ul>
            <li>Добавить задачу</li>
            <li>Запустить с...</li>
            <li>Показать результаты</li>
            <li>Распечатать</li>
            <li>Сохранить как шаблон</li>
          </ul>
        </div>
      </ClickAwayListener>
    );
  }
};

export default BpItemMenu;
