import "./BusinessMain.scss";
import React, { useContext } from "react";
import BusinessMainList from "../business-main-list/BusinessMainList";
import { StatusContext } from "../../context/status";
import CreateBp from "../create-bp/CreateBp";
import BpResultFormTreaty from "../bp-result-form-treaty/BpResultFormTreaty";
import BpResultFormWork from "../bp-result-form-work/BpResultFormWork";
import BpResultFormDismissal from "../bp-result-form-dismissal/BpResultFormDismissal";

const BusinessMain = () => {
  const { createBpStatus, setCreateBpStatus, setOpenForm } =
    useContext(StatusContext);

  const createBp = (e) => {
    if (createBpStatus === true) {
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
                <img
                  src={`${process.env.PUBLIC_URL}/assets/business-headder/FunnelSimple.svg`}
                  alt="FunnelSimple"
                />
                <p className="p-black">Инициатор</p>
              </div>
            </div>
            <div className="business__main-content__header-right">
              <button
                className="business__main-content__header-right__btn"
                onClick={() => setOpenForm("form1")}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/business-headder/branch.svg`}
                  alt="download"
                />
              </button>
              <button
                className="business__main-content__header-right__btn"
                onClick={() => setOpenForm("form2")}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/business-headder/Folders.svg`}
                  alt="stats"
                />
              </button>
              <button
                className="business__main-content__header-right__btn"
                onClick={() => setOpenForm("form3")}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/business-headder/NotePencil.svg`}
                  alt="hidden"
                />
              </button>
              <button className="business__main-content__header-right__btn">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/business-headder/Shape.svg`}
                  alt="menu"
                />
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
        <BpResultFormTreaty />
        <BpResultFormWork />
        <BpResultFormDismissal />
        <CreateBp />
      </section>
    </>
  );
};
export default BusinessMain;
