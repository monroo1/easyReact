import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";
// import axios from "axios";
import CreateTaskForm from "../create-task-form/CreateTaskForm";

const CreateTask = () => {
  const {
    createTaskForm,
    setCreateTaskForm,
    createBpForm,
    setCreateTaskStatus,
  } = useContext(StatusContext);

  const [addTask, setAddTask] = useState();

  useEffect(() => {
    if (createTaskForm.name !== null) {
      setAddTask(true);
    } else {
      setAddTask(false);
    }
  }, [createTaskForm]);

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
          <button
            className={
              addTask === true ? "blue-btn" : "blue-btn blue-btn__disabled"
            }
            id="add-task"
          >
            Добавить еще
          </button>
          <button
            className={
              addTask === true
                ? "blue-btn white-btn"
                : "blue-btn white-btn white-btn__disabled"
            }
            id="save-task"
          >
            Сохранить
          </button>
          <button
            className="defualt__btn"
            id="close-btn"
            onClick={() => {
              setCreateTaskStatus(false);
              setCreateTaskForm({
                name: null,
                begin: null,
                end: null,
                project_id: createBpForm.project_id || null,
                next_id: null,
                parent_id: null,
                prev_id: null,
                description: null,
              });
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
