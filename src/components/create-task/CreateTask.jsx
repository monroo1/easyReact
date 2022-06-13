import "./CreateTask.scss";
import CreateTaskForm from "../create-task-form/CreateTaskForm";

const CreateTask = () => {
  return (
    <div className="business__drop-content">
      <div className="businessTask businessClass">
        <div id="create-task-container">
          <p className="busines__drop-content__title p__drop-content">
            * - обязательные для заполнения поля
          </p>
          <CreateTaskForm />
        </div>
        <div>
          <button className="blue-btn blue-btn__disabled" id="add-task">
            Добавить еще
          </button>
          <button
            className="blue-btn white-btn white-btn__disabled"
            id="save-task"
          >
            Сохранить
          </button>
          <button className="defualt__btn" id="close-btn">
            Отмена
          </button>
        </div>
      </div>
      `;
    </div>
  );
};

export default CreateTask;
