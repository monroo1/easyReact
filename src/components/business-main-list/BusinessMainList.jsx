import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import BpItem from "../bp-item/BpItem.jsx";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus.jsx";
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
          {/* {bpList.map((bpItem) => (
            <BpItem el={bpItem} key={bpItem.id} />
          ))} */}
          <div
            className="business__main-content__list-block__item"
            id={"business-item-" + 1}
          >
            <div>
              <div className="business__main-content__list-block__item-left">
                <p className="business__main-content__list-block__item__number p-black">
                  {1}
                </p>
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
            <div class="dependencies">
              <div class="dependencies__content">
                <div class="dependencies__content-list">
                  <div class="dependencies__content-list__task-block">
                    <div class="dependencies__content-list__item">
                      <div class="dependencies__content-list__item__btn">
                        <img src="./img/arrow.svg" />
                      </div>

                      <div class="dependencies__content-list__item__title">
                        <p class="p-black">111</p>
                        <span class="p-grey">222</span>
                      </div>
                      <div class="dependencies__content-list__item__right">
                        <div class="dependencies__content-list__item__right__status dependencies__content-list__item__right__status-completed">
                          <img src="./img/completed.svg" />
                        </div>
                        <div class="dependencies__content-list__deadline p-black">
                          333
                        </div>
                        <div class="dependencies__content-list__item__right__logo">
                          <img src="./img/header-profile-logo.png" />
                        </div>
                        <div class="dependencies__content-list__item__right__priority">
                          <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                          <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                          <div class="dependencies__content-list__item__right__priority-indicator"></div>
                        </div>
                      </div>
                    </div>
                    <div class="dependencies__content-list__task-block__vertical-line">
                      <div></div>
                    </div>
                    <div class="dependencies__content-list__task-block__gorizont-wrapper">
                      <div
                        class="dependencies__content-list__task-block__gorizont"
                        id="dependencies-block-drow-${el.id}"
                      >
                        <div class="dependencies__content-list__task-block">
                          <div class="dependencies__content-list__item dependencies__content-list__item-dropdown">
                            <div class="dependencies__content-list__item">
                              <div class="dependencies__content-list__item__btn">
                                <img src="./img/arrow.svg" />
                              </div>

                              <div class="dependencies__content-list__item__title">
                                <p class="p-black">444</p>
                                <span class="p-grey">555</span>
                              </div>
                              <div class="dependencies__content-list__item__right">
                                <div class="dependencies__content-list__item__right__status dependencies__content-list__item__right__status-completed">
                                  <img src="./img/completed.svg" />
                                </div>
                                <div class="dependencies__content-list__deadline p-black">
                                  666
                                </div>
                                <div class="dependencies__content-list__item__right__logo">
                                  <img src="./img/header-profile-logo.png" />
                                </div>
                                <div class="dependencies__content-list__item__right__priority">
                                  <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                  <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                  <div class="dependencies__content-list__item__right__priority-indicator"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="dependencies__content-list__task-block__vertical-line">
                            <div></div>
                          </div>
                          <div class="dependencies__content-list__task-block__gorizont-wrapper">
                            <div
                              class="dependencies__content-list__task-block__gorizont"
                              id="dependencies-block-drow-${el.id}"
                            >
                              <div class="dependencies__content-list__task-block">
                                <div class="dependencies__content-list__item dependencies__content-list__item-dropdown">
                                  <div class="dependencies__content-list__item">
                                    <div class="dependencies__content-list__item__btn">
                                      <img src="./img/arrow.svg" />
                                    </div>

                                    <div class="dependencies__content-list__item__title">
                                      <p class="p-black">444</p>
                                      <span class="p-grey">555</span>
                                    </div>
                                    <div class="dependencies__content-list__item__right">
                                      <div class="dependencies__content-list__item__right__status dependencies__content-list__item__right__status-completed">
                                        <img src="./img/completed.svg" />
                                      </div>
                                      <div class="dependencies__content-list__deadline p-black">
                                        666
                                      </div>
                                      <div class="dependencies__content-list__item__right__logo">
                                        <img src="./img/header-profile-logo.png" />
                                      </div>
                                      <div class="dependencies__content-list__item__right__priority">
                                        <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                        <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                        <div class="dependencies__content-list__item__right__priority-indicator"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="dependencies__content-list__task-block__vertical-line">
                                  <div></div>
                                </div>
                                <div class="dependencies__content-list__task-block__gorizont-wrapper"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dependencies__content-list__task-block">
                    <div class="dependencies__content-list__item">
                      <div class="dependencies__content-list__item__btn">
                        <img src="./img/arrow.svg" />
                      </div>

                      <div class="dependencies__content-list__item__title">
                        <p class="p-black">111</p>
                        <span class="p-grey">222</span>
                      </div>
                      <div class="dependencies__content-list__item__right">
                        <div class="dependencies__content-list__item__right__status dependencies__content-list__item__right__status-completed">
                          <img src="./img/completed.svg" />
                        </div>
                        <div class="dependencies__content-list__deadline p-black">
                          333
                        </div>
                        <div class="dependencies__content-list__item__right__logo">
                          <img src="./img/header-profile-logo.png" />
                        </div>
                        <div class="dependencies__content-list__item__right__priority">
                          <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                          <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                          <div class="dependencies__content-list__item__right__priority-indicator"></div>
                        </div>
                      </div>
                    </div>
                    <div class="dependencies__content-list__task-block__vertical-line">
                      <div></div>
                    </div>
                    <div class="dependencies__content-list__task-block__gorizont-wrapper">
                      <div
                        class="dependencies__content-list__task-block__gorizont"
                        id="dependencies-block-drow-${el.id}"
                      >
                        <div class="dependencies__content-list__task-block">
                          <div class="dependencies__content-list__item dependencies__content-list__item-dropdown">
                            <div class="dependencies__content-list__item">
                              <div class="dependencies__content-list__item__btn">
                                <img src="./img/arrow.svg" />
                              </div>

                              <div class="dependencies__content-list__item__title">
                                <p class="p-black">444</p>
                                <span class="p-grey">555</span>
                              </div>
                              <div class="dependencies__content-list__item__right">
                                <div class="dependencies__content-list__item__right__status dependencies__content-list__item__right__status-completed">
                                  <img src="./img/completed.svg" />
                                </div>
                                <div class="dependencies__content-list__deadline p-black">
                                  666
                                </div>
                                <div class="dependencies__content-list__item__right__logo">
                                  <img src="./img/header-profile-logo.png" />
                                </div>
                                <div class="dependencies__content-list__item__right__priority">
                                  <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                  <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                  <div class="dependencies__content-list__item__right__priority-indicator"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="dependencies__content-list__task-block__vertical-line">
                            <div></div>
                          </div>
                          <div class="dependencies__content-list__task-block__gorizont-wrapper">
                            <div
                              class="dependencies__content-list__task-block__gorizont"
                              id="dependencies-block-drow-${el.id}"
                            >
                              <div class="dependencies__content-list__task-block">
                                <div class="dependencies__content-list__item dependencies__content-list__item-dropdown">
                                  <div class="dependencies__content-list__item">
                                    <div class="dependencies__content-list__item__btn">
                                      <img src="./img/arrow.svg" />
                                    </div>

                                    <div class="dependencies__content-list__item__title">
                                      <p class="p-black">444</p>
                                      <span class="p-grey">555</span>
                                    </div>
                                    <div class="dependencies__content-list__item__right">
                                      <div class="dependencies__content-list__item__right__status dependencies__content-list__item__right__status-completed">
                                        <img src="./img/completed.svg" />
                                      </div>
                                      <div class="dependencies__content-list__deadline p-black">
                                        666
                                      </div>
                                      <div class="dependencies__content-list__item__right__logo">
                                        <img src="./img/header-profile-logo.png" />
                                      </div>
                                      <div class="dependencies__content-list__item__right__priority">
                                        <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                        <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                        <div class="dependencies__content-list__item__right__priority-indicator"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="dependencies__content-list__task-block__vertical-line">
                                  <div></div>
                                </div>
                                <div class="dependencies__content-list__task-block__gorizont-wrapper"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="dependencies__content-list__task-block__gorizont"
                        id="dependencies-block-drow-${el.id}"
                      >
                        <div class="dependencies__content-list__task-block">
                          <div class="dependencies__content-list__item dependencies__content-list__item-dropdown">
                            <div class="dependencies__content-list__item">
                              <div class="dependencies__content-list__item__btn">
                                <img src="./img/arrow.svg" />
                              </div>

                              <div class="dependencies__content-list__item__title">
                                <p class="p-black">444</p>
                                <span class="p-grey">555</span>
                              </div>
                              <div class="dependencies__content-list__item__right">
                                <div class="dependencies__content-list__item__right__status dependencies__content-list__item__right__status-completed">
                                  <img src="./img/completed.svg" />
                                </div>
                                <div class="dependencies__content-list__deadline p-black">
                                  666
                                </div>
                                <div class="dependencies__content-list__item__right__logo">
                                  <img src="./img/header-profile-logo.png" />
                                </div>
                                <div class="dependencies__content-list__item__right__priority">
                                  <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                  <div class="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
                                  <div class="dependencies__content-list__item__right__priority-indicator"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="dependencies__content-list__task-block__vertical-line">
                            <div></div>
                          </div>
                          <div class="dependencies__content-list__task-block__gorizont-wrapper"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="business__main-content__list-block__item"
            id={"business-item-" + 1}
          >
            <div>
              <div className="business__main-content__list-block__item-left">
                <p className="business__main-content__list-block__item__number p-black">
                  {1}
                </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMainList;
