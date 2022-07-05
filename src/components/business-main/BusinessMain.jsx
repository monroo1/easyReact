import "./BusinessMain.scss";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StatusContext } from "../../context/status";
import { ClickAwayListener } from "@mui/base";
import BusinessMainList from "../business-main-list/BusinessMainList";
import CreateBp from "../create-bp/CreateBp";
import CreateTask from "../create-task/CreateTask";
import ChatMenu from "../chat-menu/ChatMenu";

const BusinessMain = () => {
  const {
    createBpStatus,
    setCreateBpStatus,
    createTaskStatus,
    createBpSampleStatus,
    setUsers,
    users,
    apiBp,
    openMenuTasks,
    openMenuBp,
    bpList,
  } = useContext(StatusContext);
  const [nextLink, setNextLink] = useState(
    "https://test.easy-task.ru/api/v1/users?page=1"
  );

  const [usersInitiator, setUsersInitiator] = useState([]);
  const [excelStatus, setExcelStatus] = useState(false);
  const [allTasksState, setAllTasksState] = useState([]);
  const [selectColumnsStatus, setSelectColumnsStatus] = useState(false);
  const [selectColumns, setSelectColumns] = useState([]);

  useEffect(() => {
    console.log(selectColumns);
  }, [selectColumns]);

  const createBp = () => {
    if (
      createBpStatus ||
      openMenuTasks ||
      openMenuBp ||
      createTaskStatus ||
      createBpSampleStatus
    ) {
      return false;
    }

    setCreateBpStatus(true);
  };

  useEffect(() => {
    if (!!nextLink) {
      axios
        .get(nextLink, {
          headers: {
            Authorization:
              "Bearer " +
              document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
          },
        })
        .then((res) => {
          setNextLink(res.data.links.next);
          setUsers([...users, ...res.data.data]);
        });
    }
  }, [nextLink]);

  useEffect(() => {
    users.map((el) => {
      setUsersInitiator([
        ...usersInitiator,
        {
          name: el.name + " " + el.surname,
          value: el.id,
          id: el.id,
        },
      ]);
    });
  }, [users]);

  const excelExport = async () => {
    let allTasks = [];
    await Promise.all(
      bpList.map(async (item) => {
        return item.tasks;
      })
    ).then((r) => (allTasks = r.flat()));

    await Promise.all(
      allTasks.map((item) => {
        return axios.get(`https://test.easy-task.ru/api/v1/tasks/${item.id}`, {
          headers: {
            Authorization:
              "Bearer " +
              document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
          },
        });
      })
    ).then((respo) => {
      setAllTasksState(respo.map((el) => el.data.data));
    });
  };

  const sendReq = async () => {
    const response = await axios.post(
      `${apiBp}/exportBusinessProcess`,
      {
        tasks: allTasksState,
      },
      {
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
        responseType: "blob",
      }
    );
    if (response.status === 200) {
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
    }
  };

  const excelExportColumns = async () => {
    const response = await axios.post(
      `${apiBp}/exportBusinessProcessColumn`,
      {
        columns: selectColumns,
      },
      {
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
        responseType: "blob",
      }
    );
    if (response.status === 200) {
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
    }
  };

  useEffect(() => {
    if (allTasksState.length > 0) {
      sendReq();
    }
  }, [allTasksState]);

  return (
    <>
      <section
        className={
          createBpStatus ||
          createBpSampleStatus ||
          createTaskStatus ||
          openMenuTasks ||
          openMenuBp
            ? "business business-open"
            : "business "
        }
      >
        <div className="business__main-content">
          <div className="business__main-content__header">
            <div className="business__main-content__header-left">
              <select id="business-select-menu__label">
                {usersInitiator.map((user) => {
                  return (
                    <option key={user.id} value={user.id} id={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <div className="business__main-content__header-left__position">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="#292A34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.25 7.5H21.75"
                    stroke="#292A34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.75 16.5H14.25"
                    stroke="#292A34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="p-black">Инициатор</p>
              </div>
            </div>
            <div className="business__main-content__header-right">
              <button className="business__main-content__header-right__btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.375 19.9432C7.82475 19.9432 9 18.7857 9 17.3579C9 15.9302 7.82475 14.7727 6.375 14.7727C4.92525 14.7727 3.75 15.9302 3.75 17.3579C3.75 18.7857 4.92525 19.9432 6.375 19.9432Z"
                    stroke="#292a34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.375 8.86369C7.82475 8.86369 9 7.70625 9 6.27846C9 4.85068 7.82475 3.69324 6.375 3.69324C4.92525 3.69324 3.75 4.85068 3.75 6.27846C3.75 7.70625 4.92525 8.86369 6.375 8.86369Z"
                    stroke="#292a34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.375 8.86365V14.7727"
                    stroke="#292a34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.625 19.9432C19.0747 19.9432 20.25 18.7857 20.25 17.3579C20.25 15.9302 19.0747 14.7727 17.625 14.7727C16.1753 14.7727 15 15.9302 15 17.3579C15 18.7857 16.1753 19.9432 17.625 19.9432Z"
                    stroke=" #292a34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.6252 14.7727L17.6251 11.0685C17.625 9.89318 17.1509 8.76601 16.3071 7.93492L12.75 4.43176"
                    stroke=" #292a34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.75 8.12494V4.43176H16.5"
                    stroke=" #292a34"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="business__main-content__header-right__btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 10.5V18.8333C18.75 19.0101 18.6798 19.1797 18.5547 19.3047C18.4297 19.4298 18.2601 19.5 18.0833 19.5H3.75C3.55109 19.5 3.36032 19.421 3.21967 19.2803C3.07902 19.1397 3 18.9489 3 18.75V8.25C3 8.05109 3.07902 7.86032 3.21967 7.71967C3.36032 7.57902 3.55109 7.5 3.75 7.5H8C8.16228 7.5 8.32018 7.55263 8.45 7.65L11.05 9.6C11.1798 9.69737 11.3377 9.75 11.5 9.75H18C18.1989 9.75 18.3897 9.82902 18.5303 9.96967C18.671 10.1103 18.75 10.3011 18.75 10.5Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 7.5V5.25C6 5.05109 6.07902 4.86032 6.21967 4.71967C6.36032 4.57902 6.55109 4.5 6.75 4.5H11C11.1623 4.5 11.3202 4.55263 11.45 4.65L14.05 6.6C14.1798 6.69737 14.3377 6.75 14.5 6.75H21C21.1989 6.75 21.3897 6.82902 21.5303 6.96967C21.671 7.11032 21.75 7.30109 21.75 7.5V15.8333C21.75 15.9209 21.7328 16.0076 21.6993 16.0885C21.6657 16.1693 21.6166 16.2428 21.5547 16.3047C21.4928 16.3666 21.4193 16.4157 21.3385 16.4493C21.2576 16.4828 21.1709 16.5 21.0833 16.5H18.75"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="business__main-content__header-right__btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15H9V12L18 3L21 6L12 15Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.75 5.25L18.75 8.25"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.25 11.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H12.75"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="business__main-content__header-right__btn"
                id="excel"
                onClick={() => {
                  setExcelStatus(true);
                }}
              >
                <svg
                  width="6"
                  height="16"
                  viewBox="0 0 6 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.82197 4C4.07274 4 5.09609 3.1 5.09609 2C5.09609 0.9 4.07274 0 2.82197 0C1.5712 0 0.547852 0.9 0.547852 2C0.547852 3.1 1.5712 4 2.82197 4ZM2.82197 6C1.5712 6 0.547852 6.9 0.547852 8C0.547852 9.1 1.5712 10 2.82197 10C4.07274 10 5.09609 9.1 5.09609 8C5.09609 6.9 4.07274 6 2.82197 6ZM2.82197 12C1.5712 12 0.547852 12.9 0.547852 14C0.547852 15.1 1.5712 16 2.82197 16C4.07274 16 5.09609 15.1 5.09609 14C5.09609 12.9 4.07274 12 2.82197 12Z"
                    fill="#292A34"
                  />
                </svg>
                {!!excelStatus ? (
                  <ClickAwayListener
                    onClickAway={() => {
                      setSelectColumnsStatus(false);
                      setExcelStatus(false);
                    }}
                  >
                    <div
                      id="excel-menu"
                      className={
                        selectColumnsStatus ? "excel-menu__select-column" : ""
                      }
                    >
                      {selectColumnsStatus ? (
                        <>
                          <div>
                            <div className="excel-item">
                              <input
                                type="checkbox"
                                id="excel-column-id"
                                value="id"
                                onChange={(e) => {
                                  if (selectColumns.includes(e.target.value)) {
                                    setSelectColumns(
                                      selectColumns.filter(
                                        (el) => el !== e.target.value
                                      )
                                    );
                                  } else {
                                    setSelectColumns([
                                      ...selectColumns,
                                      e.target.value,
                                    ]);
                                  }
                                }}
                              />
                              <label htmlFor="excel-column-id">
                                ID бизнесс процесса
                              </label>
                            </div>
                            <div className="excel-item">
                              <input
                                type="checkbox"
                                id="excel-column-initiator"
                                value="initiator_id"
                                onChange={(e) => {
                                  if (selectColumns.includes(e.target.value)) {
                                    setSelectColumns(
                                      selectColumns.filter(
                                        (el) => el !== e.target.value
                                      )
                                    );
                                  } else {
                                    setSelectColumns([
                                      ...selectColumns,
                                      e.target.value,
                                    ]);
                                  }
                                }}
                              />
                              <label htmlFor="excel-column-initiator">
                                Инициатор
                              </label>
                            </div>
                            <div className="excel-item">
                              <input
                                type="checkbox"
                                id="excel-column-name"
                                value="name"
                                onChange={(e) => {
                                  if (selectColumns.includes(e.target.value)) {
                                    setSelectColumns(
                                      selectColumns.filter(
                                        (el) => el !== e.target.value
                                      )
                                    );
                                  } else {
                                    setSelectColumns([
                                      ...selectColumns,
                                      e.target.value,
                                    ]);
                                  }
                                }}
                              />
                              <label htmlFor="excel-column-name">
                                Наименование
                              </label>
                            </div>
                            <div className="excel-item">
                              <input
                                type="checkbox"
                                id="excel-column-status"
                                value="status"
                                onChange={(e) => {
                                  if (selectColumns.includes(e.target.value)) {
                                    setSelectColumns(
                                      selectColumns.filter(
                                        (el) => el !== e.target.value
                                      )
                                    );
                                  } else {
                                    setSelectColumns([
                                      ...selectColumns,
                                      e.target.value,
                                    ]);
                                  }
                                }}
                              />
                              <label htmlFor="excel-column-status">
                                Статус
                              </label>
                            </div>
                            <div className="excel-item">
                              <input
                                type="checkbox"
                                id="excel-column-deadline"
                                value="deadline"
                                onChange={(e) => {
                                  {
                                    if (
                                      selectColumns.includes(e.target.value)
                                    ) {
                                      setSelectColumns(
                                        selectColumns.filter(
                                          (el) => el !== e.target.value
                                        )
                                      );
                                    } else {
                                      setSelectColumns([
                                        ...selectColumns,
                                        e.target.value,
                                      ]);
                                    }
                                  }
                                }}
                              />
                              <label htmlFor="excel-column-deadline">
                                Длительность
                              </label>
                            </div>
                            <div className="excel-item">
                              <input
                                type="checkbox"
                                id="excel-column-project"
                                value="project_id"
                                onChange={(e) => {
                                  if (selectColumns.includes(e.target.value)) {
                                    setSelectColumns(
                                      selectColumns.filter(
                                        (el) => el !== e.target.value
                                      )
                                    );
                                  } else {
                                    setSelectColumns([
                                      ...selectColumns,
                                      e.target.value,
                                    ]);
                                  }
                                }}
                              />
                              <label htmlFor="excel-column-project">
                                Проект
                              </label>
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              if (selectColumns.length > 0) {
                                excelExportColumns();
                              }
                            }}
                            style={
                              !selectColumns.length > 0
                                ? { backgroundColor: "grey", cursor: "default" }
                                : {}
                            }
                          >
                            Выгрузить
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="excel-item"
                            onClick={() => excelExport()}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/DownloadSimple.svg`}
                              alt=""
                            />
                            Экспорт в Excel
                          </div>
                          <div
                            className="excel-item"
                            onClick={() => setSelectColumnsStatus(true)}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/Gear.svg`}
                              alt=""
                            />
                            Выбрать столбцы
                          </div>
                        </>
                      )}
                    </div>
                  </ClickAwayListener>
                ) : (
                  <></>
                )}
              </button>
              <button
                className="blue-btn create-bp"
                id="create-task"
                onClick={() => createBp()}
              >
                <span style={{ fontSize: 24 + "px", marginRight: 15 + "px" }}>
                  +
                </span>
                Добавить
              </button>
            </div>
          </div>
          <BusinessMainList />
        </div>
        <ChatMenu />
        <CreateBp />
        {createTaskStatus === true ? <CreateTask /> : <></>}
      </section>
    </>
  );
};
export default BusinessMain;
