import React, { useContext } from "react";
import { StatusContext } from "../../context/status.js";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus";
import BpItemMenu from "../ui/bp-item-menu/BpItemMenu.jsx";

const BpItem = ({ el }) => {
  const { createBpStatus, idBp, setIdBp } = useContext(StatusContext);

  return (
    <div
      className={
        createBpStatus
          ? "business__main-content__list-block__item business__main-content__list-block__item-active"
          : "business__main-content__list-block__item"
      }
    >
      <div id={"business-item-" + el.id}>
        <div className="business__main-content__list-block__item-left">
          <div className="business__main-content__list-block__item__arrow">
            <img
              src={`${process.env.PUBLIC_URL}/assets/ShapeBlack.svg`}
              alt="drop"
              style={{ opacity: 0.5 }}
            />
          </div>
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
            <p className="p-black">{el.project_id}</p>
            <span className="p-grey">{el.project_id}</span>
          </div>
        </div>
        <div
          className="dropdown-menu__bpItem"
          data-id={el.id}
          onClick={(e) => {
            if (e.target.dataset.id == idBp) {
              setIdBp("");
            } else {
              setIdBp(e.target.dataset.id);
            }
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/drop-down-menu.svg`}
            alt="menu"
            data-id={el.id}
            onClick={(e) => {
              e.stopPropagation();
              if (e.target.dataset.id == idBp) {
                setIdBp("");
              } else {
                setIdBp(e.target.dataset.id);
              }
            }}
          />
        </div>
        <BpItemMenu id={el.id} />
      </div>
    </div>
  );
};

export default BpItem;
