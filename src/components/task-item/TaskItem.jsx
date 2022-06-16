import React, { useContext } from "react";
import { StatusContext } from "../../context/status";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus";

const TaskItem = ({ style }) => {
  const { createBpStatus } = useContext(StatusContext);
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
        <p className="p-black">444</p>
        <span className="p-grey">555</span>
      </div>
      <div
        className={
          createBpStatus
            ? "dependencies__content-list__item__right dependencies__content-list__item__right-active"
            : "dependencies__content-list__item__right"
        }
      >
        <BpItemStatus status={8} />
        <div className="dependencies__content-list__deadline p-black">666</div>
        <div className="business__main-content__list-block__item__logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
            alt="logo"
          />
        </div>
        <div className="business__main-content__list-block__item__project dependencies__content-list__projcet">
          <p className="p-black">project</p>
          <span className="p-grey">projectTheme</span>
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
