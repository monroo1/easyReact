import React from "react";
import "./BpItemMenu.scss";

const BpItemMenu = () => {
  return (
    <div className="bp-item-menu">
      <ul>
        <li>Добавить задачу</li>
        <li>Запустить с...</li>
        <li>Показать результаты</li>
        <li>Распечатать</li>
        <li>Сохранить как шаблон</li>
      </ul>
    </div>
  );
};

export default BpItemMenu;
