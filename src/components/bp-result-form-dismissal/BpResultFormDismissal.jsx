import React from "react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./BpResultFormDismissal.scss";

const BpResultFormDismissal = () => {
  const [relationshipFormat, setRelationshipFormat] = useState("");

  return (
    <form id="new-bp__form">
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Сотрудник
        </label>
        <select className="input-form">
          <option>Иванов И.И.</option>
        </select>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Работодатель
        </label>
        <TextareaAutosize minRows={3} className="input-form"></TextareaAutosize>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Формат взаимоотношений
        </label>
        <select
          className="input-form"
          onChange={(e) => setRelationshipFormat(e.target.value)}
        >
          <option value={""}>Выбрать</option>
          <option value={"ГПХ-ТД"}>ГПХ-ТД</option>
          <option value={"ТД"}>ТД</option>
          <option value={"СМЗ"}>СМЗ</option>
          <option value={"ИП"}>ИП</option>
          <option value={"вне штата"}>вне штата</option>
        </select>
      </div>
      {relationshipFormat === "ТД" ? (
        <>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Основание для увольнения
            </label>
            <select className="input-form">
              <option>Заявление на увольнение прикрепить скан (поле);</option>
              <option>
                Соглашение сторон доп. поле с указанием дружественное/не
                дружественное;
              </option>
              <option>
                Сокращение доп. поле с указанием дружественное/не дружественное;
              </option>
              <option>
                Статья прикрепить сканы обосновывающих документов (поле);
              </option>
            </select>
          </div>
          <div>
            <label
              className="p__drop-content"
              htmlFor="reporting-previous-year"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Заявление на увольнение
            </label>
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
        </>
      ) : (
        <></>
      )}
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Соглашение сторон
        </label>
        <div className="we-supply">
          <div>
            <input type="radio" id="we-supply" name="we-supply" />
            <label htmlFor="we-supply" className="we-supply__radio"></label>
            <label htmlFor="we-supply">Дружественное</label>
          </div>
          <div>
            <input type="radio" id="we-supplied" name="we-supply" />
            <label htmlFor="we-supplied" className="we-supply__radio"></label>
            <label htmlFor="we-supplied">Не дружественное</label>
          </div>
        </div>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Сокращение
        </label>
        <div className="we-supply">
          <div>
            <input type="radio" id="we-supply" name="we-supply" />
            <label htmlFor="we-supply" className="we-supply__radio"></label>
            <label htmlFor="we-supply">Дружественное</label>
          </div>
          <div>
            <input type="radio" id="we-supplied" name="we-supply" />
            <label htmlFor="we-supplied" className="we-supply__radio"></label>
            <label htmlFor="we-supplied">Не дружественное</label>
          </div>
        </div>
      </div>
      <div>
        <label className="p__drop-content" htmlFor="reporting-previous-year">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Статья
        </label>
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
      {relationshipFormat === "ГПХ" ? (
        <div>
          <label className="p__drop-content" htmlFor="reporting-previous-year">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Соглашение о расторжении договора ГПХ
          </label>
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
      ) : (
        <></>
      )}
      {relationshipFormat === "СМЗ" || "ИП" ? (
        <div>
          <label className="p__drop-content" htmlFor="reporting-previous-year">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Соглашение о расторжении ДОУ
          </label>
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
      ) : (
        <></>
      )}
      {relationshipFormat === "вне штата" ? (
        <div>
          <label className="p__drop-content" htmlFor="reporting-previous-year">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Внутренний обходной лист, подписанный руководителем, скан (поле)
          </label>
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
      ) : (
        <></>
      )}

      <div className="input__date">
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
            alt="CalendarBlank"
          />
          Общий срок
        </label>
        <div>
          <input className="input-form" type="date" />
        </div>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Комментарии
        </label>
        <TextareaAutosize minRows={3} className="input-form"></TextareaAutosize>
      </div>
    </form>
  );
};

export default BpResultFormDismissal;
