import "./BusinessMain.scss";
import React, { useContext } from "react";
import BusinessMainList from "../business-main-list/BusinessMainList";
import { StatusContext } from "../../context/status";
import CreateBp from "../create-bp/CreateBp";
import CreateTask from "../create-task/CreateTask";

const BusinessMain = () => {
  const {
    createBpStatus,
    setCreateBpStatus,
    createTaskStatus,
    setCreateTaskStatus,
  } = useContext(StatusContext);

  const createBp = (e) => {
    if (createBpStatus === true) {
      return false;
    }
    if (createTaskStatus === true) {
      return false;
    }
    setCreateBpStatus(true);
  };

  return (
    <>
      <section className="business">
        <div className="business__main-content">
          <div className="business__main-content__header">
            <div className="business__main-content__header-left">
              <div className="business__main-content__header-left__select">
                <input
                  className="hidden"
                  type="checkbox"
                  id="business-select-menu"
                />
                <label
                  htmlFor="business-select-menu"
                  id="business-select-menu__label"
                >
                  <div>
                    <div className="business-select-menu__img">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
                        alt="logo"
                      />
                    </div>
                    <p className="p-black">Шеин Алексей</p>
                  </div>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/Shape.svg`}
                    alt="Shape"
                  />
                </label>
                <ul id="business-select-menu__list">
                  <li>
                    <button className="business-select-menu__list-item">
                      <div>
                        <div className="business-select-menu__img">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
                            alt="logo"
                          />
                        </div>
                        <p className="p-black">Шеин Алексей</p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button className="business-select-menu__list-item">
                      <div>
                        <div className="business-select-menu__img">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
                            alt="logo"
                          />
                        </div>
                        <p className="p-black">Шеин Алексей</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
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
              <button className="business__main-content__header-right__btn">
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
              </button>
              <button
                className="blue-btn create-bp"
                id="create-task"
                onClick={(e) => createBp(e.target)}
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
        {createBpStatus === true ? <CreateBp /> : <></>}
        {createTaskStatus === true ? <CreateTask /> : <></>}
      </section>
    </>
  );
};
export default BusinessMain;
