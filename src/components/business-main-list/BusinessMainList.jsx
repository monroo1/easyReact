import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import BpItem from "../bp-item/BpItem.jsx";
import SortBtn from "../ui/sort-btn/SortBtn.jsx";
import { StatusContext } from "../../context/status.js";

const BusinessMainList = () => {
  const [bpList, setBpList] = useState([]);
  const { filter, setFilter, filterMethod } = useContext(StatusContext);

  useEffect(() => {
    axios
      .get(
        `https://b6fed652a996ab.lhrtunnel.link/api/v1/businessProcess?orderFilter[${filter}]=${filterMethod}`
      )
      .then((response) => {
        setBpList(response.data.data);
      });
  }, [setBpList, filter, filterMethod]);

  const sortFunc = (e) => {
    setFilter(e.dataset.sort);
  };

  return (
    <div className="business__main-content__list-block">
      <div className="business__main-content__list-block__title">
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
          {bpList.map((bpItem) => (
            <BpItem el={bpItem} key={bpItem.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessMainList;
