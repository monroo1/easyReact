import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import BpItem from "../bp-item/BpItem.jsx";
import SortBtn from "../ui/sort-btn/SortBtn.jsx";
import { StatusContext } from "../../context/status.js";

const BusinessMainList = () => {
  const {
    filter,
    setFilter,
    filterMethod,
    createBpStatus,
    createBpSampleStatus,
    apiBp,
    bpList,
    setBpList,
    openMenuTasks,
    openMenuBp,
    createTaskStatus,
    search,
  } = useContext(StatusContext);

  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  useEffect(() => {
    if (search.trim() !== "") {
      axios
        .get(
          `${apiBp}/businessProcess?orderFilter[${filter}]=${filterMethod}&searchFilter[name]=${search}`,
          {
            headers: {
              "secret-token": token,
            },
          }
        )
        .then((response) => {
          setBpList(response.data.data);
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get(
          `${apiBp}/businessProcess?orderFilter[${filter}]=${filterMethod}`,
          {
            headers: {
              "secret-token": token,
            },
          }
        )
        .then((response) => {
          setBpList(response.data.data);
        })
        .catch((e) => console.log(e));
    }
  }, [setBpList, filter, filterMethod, search]);

  const sortFunc = (e) => {
    setFilter(e.dataset.sort);
  };

  return (
    <div className="business__main-content__list-block">
      <div
        className={
          createBpStatus || createBpSampleStatus || openMenuTasks || openMenuBp
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
              <img
                src={`${process.env.PUBLIC_URL}/assets/arrow.svg`}
                alt="arrow"
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/arrow.svg`}
                alt="arrow"
                style={{ transform: "rotate(180deg)" }}
              />
            </div>
            <button
              className="p-grey sort"
              data-sort="initiator_id"
              onClick={(e) => sortFunc(e.target)}
            >
              Инициатор
              {filter === "initiator_id" ? <SortBtn /> : <></>}
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
            data-sort="status"
            onClick={(e) => sortFunc(e.target)}
          >
            Статус
            {filter === "status" ? <SortBtn /> : <></>}
          </button>
          <button
            className="p-grey sort"
            data-sort="deadline"
            onClick={(e) => sortFunc(e.target)}
          >
            Длительность
            {filter === "deadline" ? <SortBtn /> : <></>}
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
            data-sort="project_id"
            onClick={(e) => sortFunc(e.target)}
          >
            Проект
            {filter === "project_id" ? <SortBtn /> : <></>}
          </button>
          {openMenuTasks ||
          openMenuBp ||
          createTaskStatus ||
          createBpSampleStatus ? (
            <></>
          ) : (
            <button
              className="p-grey sort"
              data-sort="id7"
              onClick={(e) => sortFunc(e.target)}
            >
              Приоритет
              {filter === "id7" ? <SortBtn /> : <></>}
            </button>
          )}
        </div>
      </div>
      <div className="business__main-content__list-block__container">
        <div>
          {bpList.map((bpItem) => (
            <BpItem el={bpItem} key={bpItem.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessMainList;
