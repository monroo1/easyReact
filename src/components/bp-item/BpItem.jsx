import React from "react";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus";

const BpItem = ({ el }) => {
  return (
    <div
      className="business__main-content__list-block__item"
      id={"business-item-" + el.id}
    >
      <div className="business__main-content__list-block__item-left">
        <p className="business__main-content__list-block__item__number p-black">
          {el.id}
        </p>
        <div className="business__main-content__list-block__item__logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
            alt="logo"
          />
        </div>
        <div
          className="business__main-content__list-block__item__message business__main-content__list-block__item__message-active"
          id={"business-item-btn-" + el.id}
        >
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/message.svg`}
              alt="message"
            />
          </div>
        </div>
        <div className="business__main-content__list-block__item__name">
          <p className="p-black">{el.name}</p>
        </div>
      </div>
      <div className="business__main-content__list-block__item-right">
        <BpItemStatus status={el.status} />
        <p className="business__main-content__list-block__item__deadline p-black">
          {new Date(el.deadline).toLocaleString("ru", {
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="business__main-content__list-block__item__project">
          <p className="p-black">{el.project}</p>
          <span className="p-grey">{el.projectTheme}</span>
        </div>
      </div>
      <div className="dropdown-menu__bpItem">
        <img
          src={`${process.env.PUBLIC_URL}/assets/drop-down-menu.svg`}
          alt="menu"
        />
      </div>
    </div>
  );
};

export default BpItem;
