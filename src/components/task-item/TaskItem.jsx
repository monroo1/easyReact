import React, { useContext } from "react";
import { StatusContext } from "../../context/status";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus";

const TaskItem = ({ style, el }) => {
  const { createBpStatus } = useContext(StatusContext);
  // console.log(el.end);
  return (
    <div
      className={
        style === "dropdown"
          ? "dependencies__content-list__item dependencies__content-list__item-dropdown"
          : "dependencies__content-list__item"
      }
    >
      <div className="dependencies__content-list__item__btn">
        <div className="business__main-content__list-block__item__arrow">
          <img
            src={`${process.env.PUBLIC_URL}/assets/ShapeBlack.svg`}
            alt="drop"
            style={{ opacity: 0.5 }}
          />
        </div>
        <div
          className="business__main-content__list-block__item__message business__main-content__list-block__item__message-active"
          id={"business-item-btn-" + 1}
        >
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/message.svg`}
              alt="message"
            />
          </div>
        </div>
      </div>

      <div className="dependencies__content-list__item__title">
        <p className="p-black">{el.name.slice(0, 20)}</p>
        <span className="p-grey">{el.description.slice(0, 20)}</span>
      </div>
      <div
        className={
          createBpStatus
            ? "dependencies__content-list__item__right dependencies__content-list__item__right-active"
            : "dependencies__content-list__item__right"
        }
      >
        <BpItemStatus status={8} />
        <div className="dependencies__content-list__deadline p-black">
          {new Date(new Date(el.end).toJSON())
            .toLocaleString("ru", {
              month: "long",
              day: "numeric",
            })
            .slice(0, 7)}
        </div>
        <div className="business__main-content__list-block__item__logo business__main-content__list-block__item__logo__task">
          <img
            src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
            alt="logo"
          />
        </div>
        <div className="dependencies__content-list__project">
          <p className="p-black">{"projectTheme".slice(0, 10)}</p>
          <span className="p-grey">{"projectTheme".slice(0, 12)}</span>
        </div>
        <div className="dependencies__content-list__item__right__priority">
          <div className="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
          <div className="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
          <div className="dependencies__content-list__item__right__priority-indicator"></div>
        </div>
        <div className="dependencies__content-list__item__right__list">
          <img src={`${process.env.PUBLIC_URL}/assets/List.svg`} alt="list" />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
