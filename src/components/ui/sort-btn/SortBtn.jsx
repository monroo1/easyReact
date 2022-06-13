import React, { useContext } from "react";
import { StatusContext } from "../../../context/status";
import "./SortBtn.scss";

const SortBtn = () => {
  const { filterMethod, setFilterMethod } = useContext(StatusContext);

  return (
    <div
      className="sort-btn"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/ShapeBlack.svg`}
        alt="asc"
        className={`sort-btn__top-btn 
          ${filterMethod === "asc" ? "sort-btn__top-btn__active" : ""}`}
        onClick={() => setFilterMethod("asc")}
      />
      <img
        src={`${process.env.PUBLIC_URL}/assets/ShapeBlack.svg`}
        alt="desc"
        className={`sort-btn__bottom-btn 
        ${filterMethod === "desc" ? "sort-btn__top-btn__active" : ""}`}
        onClick={() => setFilterMethod("desc")}
      />
    </div>
  );
};

export default SortBtn;
