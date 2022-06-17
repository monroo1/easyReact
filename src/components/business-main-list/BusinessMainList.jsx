import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import BpItem from "../bp-item/BpItem.jsx";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus.jsx";
import SortBtn from "../ui/sort-btn/SortBtn.jsx";
import { StatusContext } from "../../context/status.js";
import TasksList from "../dep-tasks-list/TasksList.jsx";
import BpItemMenu from "../ui/bp-item-menu/BpItemMenu.jsx";

const BusinessMainList = () => {
  const [bpList, setBpList] = useState([]);
  const {
    filter,
    setFilter,
    filterMethod,
    createBpStatus,
    openTasks,
    setOpenTasks,
  } = useContext(StatusContext);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://b6fed652a996ab.lhrtunnel.link/api/v1/businessProcess?orderFilter[${filter}]=${filterMethod}`
  //     )
  //     .then((response) => {
  //       setBpList(response.data.data);
  //     });
  // }, [setBpList, filter, filterMethod]);

  const sortFunc = (e) => {
    setFilter(e.dataset.sort);
  };

  const openTasksMenu = (e) => {
    if (e.id === openTasks) {
      setOpenTasks("");
    } else {
      setOpenTasks(e.id);
    }
  };

  return (
    <div className="business__main-content__list-block">
      <div
        className={
          createBpStatus
            ? "business__main-content__list-block__title business__main-content__list-block__title-active"
            : "business__main-content__list-block__title"
        }
      >
        <div>
          <div
            style={{ display: "flex", gap: 23 + "px", alignItems: "center" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4 + "px",
              }}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/arrow.svg`} alt="" />
              <img
                src={`${process.env.PUBLIC_URL}/assets/arrow.svg`}
                alt=""
                style={{ transform: "rotate(180deg)" }}
              />
            </div>
            <button
              className="p-grey sort"
              data-sort="id"
              onClick={(e) => sortFunc(e.target)}
            >
              Инициатор
              {filter === "id" ? <SortBtn /> : <></>}
            </button>
          </div>
          <button
            className="p-grey sort"
            data-sort="name"
            onClick={(e) => sortFunc(e.target)}
          >
            Нименование
            {filter === "name" ? <SortBtn /> : <></>}
          </button>
        </div>
        <div>
          <button
            className="p-grey sort"
            data-sort="id3"
            onClick={(e) => sortFunc(e.target)}
          >
            Статус
            {filter === "id3" ? <SortBtn /> : <></>}
          </button>
          <button
            className="p-grey sort"
            data-sort="id4"
            onClick={(e) => sortFunc(e.target)}
          >
            Длительность
            {filter === "id4" ? <SortBtn /> : <></>}
          </button>
          <button
            className="p-grey sort"
            data-sort="id5"
            onClick={(e) => sortFunc(e.target)}
          >
            Исполнитель
            {filter === "id5" ? <SortBtn /> : <></>}
          </button>
          <button
            className="p-grey sort"
            data-sort="id6"
            onClick={(e) => sortFunc(e.target)}
          >
            Проект
            {filter === "id6" ? <SortBtn /> : <></>}
          </button>
          <button
            className="p-grey sort"
            data-sort="id7"
            onClick={(e) => sortFunc(e.target)}
          >
            Приоритет
            {filter === "id7" ? <SortBtn /> : <></>}
          </button>
        </div>
      </div>
      <div className="business__main-content__list-block__container">
        <div>
          {/* {bpList.map((bpItem) => (
            <BpItem el={bpItem} key={bpItem.id} />
          ))} */}
          <div
            className={
              createBpStatus
                ? "business__main-content__list-block__item business__main-content__list-block__item-active"
                : "business__main-content__list-block__item"
            }
          >
            <div
              id={"business-item-" + 1}
              onClick={(e) => {
                openTasksMenu(e.target);
              }}
            >
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
                  id={"business-item-btn-" + 1}
                >
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/message.svg`}
                      alt="message"
                    />
                  </div>
                </div>
                <div className="business__main-content__list-block__item__name">
                  <p className="p-black">name</p>
                </div>
              </div>
              <div className="business__main-content__list-block__item-right">
                <BpItemStatus status={5} />
                <p className="business__main-content__list-block__item__deadline p-black">
                  {/* {new Date(el.deadline).toLocaleString("ru", {
                  month: "long",
                  day: "numeric",
                })} */}
                </p>
                <div className="business__main-content__list-block__item__project">
                  <p className="p-black">project</p>
                  <span className="p-grey">projectTheme</span>
                </div>
              </div>
              <div className="dropdown-menu__bpItem">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/drop-down-menu.svg`}
                  alt="menu"
                />
              </div>
              <BpItemMenu />
            </div>
            {openTasks === "business-item-" + 1 ? <TasksList /> : <></>}
          </div>
          <div
            className={
              createBpStatus
                ? "business__main-content__list-block__item business__main-content__list-block__item-active"
                : "business__main-content__list-block__item"
            }
          >
            <div
              id={"business-item-" + 2}
              onClick={(e) => openTasksMenu(e.target)}
            >
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
                  id={"business-item-btn-" + 1}
                >
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/message.svg`}
                      alt="message"
                    />
                  </div>
                </div>
                <div className="business__main-content__list-block__item__name">
                  <p className="p-black">name</p>
                </div>
              </div>
              <div className="business__main-content__list-block__item-right">
                <BpItemStatus status={1} />
                <p className="business__main-content__list-block__item__deadline p-black">
                  {/* {new Date(el.deadline).toLocaleString("ru", {
                  month: "long",
                  day: "numeric",
                })} */}
                </p>
                <div className="business__main-content__list-block__item__project">
                  <p className="p-black">project</p>
                  <span className="p-grey">projectTheme</span>
                </div>
              </div>
              <div className="dropdown-menu__bpItem">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/drop-down-menu.svg`}
                  alt="menu"
                />
              </div>
            </div>
            {openTasks === "business-item-" + 2 ? <TasksList /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMainList;
