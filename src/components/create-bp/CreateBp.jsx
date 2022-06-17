import React, { useContext } from "react";
import { StatusContext } from "../../context/status";
import "./CreateBp.scss";

const CreateBp = () => {
  const { createBpStatus, setCreateBpStatus, createBpForm, setCreateBpForm } =
    useContext(StatusContext);

  if (createBpStatus) {
    return (
      <div className="business__drop-content">
        <div id="business" className="businessClass">
          <div>
            <p className="business__drop-content__title p__drop-content">
              * - обязательные для заполнения поля
            </p>
            <form id="new-bp__form">
              <div>
                <label className="p__drop-content" htmlFor="input-name">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Шаблон
                </label>
                <input
                  className="input-form"
                  type="text"
                  id="input-name"
                  onChange={(e) =>
                    setCreateBpForm({ ...createBpForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="p__drop-content" htmlFor="input-name">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Название*
                </label>
                <input
                  className="input-form"
                  type="text"
                  id="input-name"
                  onChange={(e) =>
                    setCreateBpForm({ ...createBpForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="p__drop-content" htmlFor="input-project">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Проект*
                </label>
                <input
                  className="input-form"
                  type="text"
                  id="input-project"
                  onChange={(e) =>
                    setCreateBpForm({
                      ...createBpForm,
                      project_id: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="p__drop-content" htmlFor="input-initiator">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/User.svg`}
                    alt="User"
                  />
                  Инициатор
                </label>
                <input
                  className="input-form"
                  type="text"
                  id="input-initiator"
                  onChange={(e) =>
                    setCreateBpForm({
                      ...createBpForm,
                      initiator_id: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input__date">
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
                    alt="CalendarBlank"
                  />
                  Общий срок
                </label>
                <div>
                  <input
                    className="input-form"
                    type="date"
                    id="input-date"
                    onChange={(e) =>
                      setCreateBpForm({
                        ...createBpForm,
                        deadlineDate: e.target.value,
                      })
                    }
                  />
                  <input
                    className="input-form"
                    type="time"
                    id="input-time"
                    onChange={(e) =>
                      setCreateBpForm({
                        ...createBpForm,
                        deadlineTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div id="input-download">
                <label
                  className="p__drop-content"
                  htmlFor="input-download__input"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Vector.svg`}
                    alt="Vector"
                  />
                  Прикрепить файл
                </label>
                <input type="file" id="input-download__input" />
                <label
                  className="p__drop-content"
                  htmlFor="input-download__input"
                  id="input-download__input-label"
                >
                  Выбрать
                </label>
              </div>
            </form>
          </div>
          <div>
            <button
              className="blue-btn blue-btn__disabled"
              id="bussines-next"
              onClick={() => {
                console.log(createBpForm);
              }}
            >
              Далее
            </button>
            <button
              className="defualt__btn"
              id="close-btn"
              onClick={() => {
                setCreateBpStatus(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CreateBp;
