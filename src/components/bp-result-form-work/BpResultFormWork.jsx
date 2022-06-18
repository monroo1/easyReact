import React, { useContext } from "react";
import { StatusContext } from "../../context/status";
import TextareaAutosize from "react-textarea-autosize";
import "./BpResultFormWork.scss";

const BpResultFormWork = () => {
  const { openForm } = useContext(StatusContext);

  if (openForm === "form2") {
    return (
      <div className="business__drop-content">
        <div id="business" className="businessClass">
          <div>
            <form id="new-bp__form">
              <div>
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Новая/существующая позиция
                </label>
                <select className="input-form">
                  <option>Существующая позиция</option>
                  <option>Несуществующая позиция</option>
                </select>
              </div>
              <div className="input-form__short">
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Оклад
                </label>
                <input
                  className="input-form"
                  type="number"
                  placeholder="56 000"
                />
              </div>
              <div className="input-form__short">
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Оклад
                </label>
                <input
                  className="input-form"
                  type="number"
                  placeholder="56 000"
                />
              </div>
              <div className="input-form__short">
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Оклад
                </label>
                <input
                  className="input-form"
                  type="number"
                  placeholder="56 000"
                />
              </div>
              <div>
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Формат взаимоотношений
                </label>
                <select className="input-form">
                  <option>ГПХ-ТД</option>
                  <option>СМЗ</option>
                  <option>ИП</option>
                  <option>вне штата</option>
                </select>
              </div>
              <div>
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Формат взаимоотношений
                </label>
                <TextareaAutosize
                  minRows={3}
                  className="input-form"
                  placeholder="Поставка осуществляется в срок 5 дней подписания договора"
                ></TextareaAutosize>
              </div>
              <div>
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Обязанности
                </label>
                <TextareaAutosize
                  minRows={3}
                  className="input-form"
                  placeholder="Поставка осуществляется в срок 5 дней подписания договора"
                ></TextareaAutosize>
              </div>
              <div>
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  График работы
                </label>
                <TextareaAutosize
                  minRows={3}
                  className="input-form"
                  placeholder="Поставка осуществляется в срок 5 дней подписания договора"
                ></TextareaAutosize>
                <div style={{ marginTop: 20 + "px" }}>
                  <input type="file" id="reporting-previous-year" />
                  <label
                    className="p__drop-content download-file"
                    htmlFor="reporting-previous-year"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                      alt="download"
                    />
                    Прикрепить файл
                  </label>
                </div>
              </div>
              <div>
                <label className="p__drop-content">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                    alt="Article"
                  />
                  Прикрепление документов
                </label>
                <div className="doc-list">
                  <label className="p__drop-content">ГПХ/ТД:</label>
                  <input type="file" id="reporting-previous-year" />
                  <label
                    className="p__drop-content download-file"
                    htmlFor="reporting-previous-year"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                      alt="download"
                    />
                    Прикрепить файл
                  </label>
                </div>
                <div className="doc-list">
                  <label className="p__drop-content">СМЗ:</label>
                  <input type="file" id="reporting-previous-year" />
                  <label
                    className="p__drop-content download-file"
                    htmlFor="reporting-previous-year"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                      alt="download"
                    />
                    Прикрепить файл
                  </label>
                </div>
                <div className="doc-list">
                  <label className="p__drop-content">ИП:</label>
                  <input type="file" id="reporting-previous-year" />
                  <label
                    className="p__drop-content download-file"
                    htmlFor="reporting-previous-year"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                      alt="download"
                    />
                    Прикрепить файл
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div>
            <button className="blue-btn blue-btn__disabled" id="bussines-next">
              Далее
            </button>
            <button className="defualt__btn" id="close-btn">
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default BpResultFormWork;
