import "./LeftNav.scss";
import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";

const LeftNav = () => {
  const {
    createBpStatus,
    createTaskStatus,
    setCreateBpSampleStatus,
    createBpSampleStatus,
  } = useContext(StatusContext);
  const [navStyle, setNavStyle] = useState("");

  useEffect(() => {
    if (createBpStatus || createTaskStatus || createBpSampleStatus) {
      setNavStyle("left-nav-hidden");
    } else {
      setNavStyle("");
    }
  }, [createBpStatus, setNavStyle, createTaskStatus, createBpSampleStatus]);

  return (
    <section className={"left-nav " + navStyle}>
      <div className="left-nav__logo">
        EASY<span>TASK</span>
      </div>
      <div className="left-nav__logo-hidden">
        <img src={`${process.env.PUBLIC_URL}/assets/nav-logo.svg`} alt="logo" />
      </div>
      <nav className="left-nav__navbar">
        <a href="/#" className="left-nav__nav-item">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5 13L14.1666 20L10.5 16.5"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p>Задачи</p>
        </a>
        <a href="/#" className="left-nav__nav-item">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 28H6.99902C6.73381 28 6.47945 27.8946 6.29192 27.7071C6.10438 27.5196 5.99902 27.2652 5.99902 27V5C5.99902 4.73478 6.10438 4.48043 6.29192 4.29289C6.47945 4.10536 6.73381 4 6.99902 4H19L26 11V27C26 27.1313 25.9741 27.2614 25.9239 27.3827C25.8736 27.504 25.8 27.6142 25.7071 27.7071C25.6143 27.8 25.504 27.8736 25.3827 27.9239C25.2614 27.9741 25.1313 28 25 28Z"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 4V11H26.001"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17H20"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21H20"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p>Проекты</p>
        </a>
        <a href="/#" className="left-nav__nav-item">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0001 17C14.5899 17 17.5001 14.0899 17.5001 10.5C17.5001 6.91015 14.5899 4 11.0001 4C7.41021 4 4.50006 6.91015 4.50006 10.5C4.50006 14.0899 7.41021 17 11.0001 17Z"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                d="M19.4266 4.24212C20.3206 3.99023 21.2582 3.93284 22.1763 4.07383C23.0944 4.21483 23.9716 4.55092 24.7488 5.05947C25.526 5.56802 26.1853 6.23723 26.6821 7.02202C27.1789 7.8068 27.5018 8.68894 27.629 9.60903C27.7562 10.5291 27.6848 11.4658 27.4195 12.3559C27.1542 13.2461 26.7013 14.069 26.0911 14.7694C25.481 15.4697 24.7279 16.0312 23.8825 16.416C23.0371 16.8007 22.1191 16.9999 21.1903 17"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.99951 21.6746C3.01468 20.2306 4.36238 19.052 5.92882 18.2384C7.49527 17.4248 9.23448 17.0001 10.9996 17C12.7648 16.9999 14.504 17.4246 16.0705 18.238C17.637 19.0515 18.9848 20.23 20.0001 21.6739"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.1902 17C22.9555 16.9987 24.6952 17.4228 26.2618 18.2364C27.8284 19.05 29.176 20.2291 30.1903 21.6739"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p>Сотрудники</p>
        </a>
        <a href="/#" className="left-nav__nav-item">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 3V7"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 3V7"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 11H27"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 15.9996H15L13 18.4996C13.3289 18.4996 13.6526 18.5807 13.9427 18.7357C14.2327 18.8907 14.48 19.1148 14.6628 19.3882C14.8455 19.6616 14.958 19.9758 14.9903 20.3031C15.0226 20.6304 14.9737 20.9605 14.848 21.2644C14.7222 21.5682 14.5235 21.8364 14.2694 22.0451C14.0153 22.2538 13.7136 22.3967 13.3911 22.461C13.0686 22.5253 12.7352 22.5091 12.4205 22.4138C12.1057 22.3185 11.8193 22.147 11.5866 21.9147"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 17.4996L20 15.9996V22.4996"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p>Календарь</p>
        </a>
        <a href="/#" className="left-nav__nav-item left-nav__nav-item__active">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 26.5909C10.433 26.5909 12 25.0476 12 23.1439C12 21.2402 10.433 19.697 8.5 19.697C6.567 19.697 5 21.2402 5 23.1439C5 25.0476 6.567 26.5909 8.5 26.5909Z"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 11.8182C10.433 11.8182 12 10.2749 12 8.37121C12 6.4675 10.433 4.92424 8.5 4.92424C6.567 4.92424 5 6.4675 5 8.37121C5 10.2749 6.567 11.8182 8.5 11.8182Z"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 11.8182V19.697"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.5003 26.5909C25.4333 26.5909 27.0003 25.0476 27.0003 23.1439C27.0003 21.2402 25.4333 19.697 23.5003 19.697C21.5673 19.697 20.0003 21.2402 20.0003 23.1439C20.0003 25.0476 21.5673 26.5909 23.5003 26.5909Z"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.5003 19.697L23.5001 14.7581C23.5 13.191 22.8679 11.6881 21.7427 10.58L17 5.90909"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 10.8333V5.90909H22"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p>Бизнес-процессы</p>
        </a>
      </nav>
    </section>
  );
};

export default LeftNav;
