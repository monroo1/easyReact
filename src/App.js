import "./App.css";
import React, { useState } from "react";
import { StatusContext } from "./context/status";
import Header from "./components/header/Header";
import BusinessMain from "./components/business-main/BusinessMain";
import LeftNav from "./components/left-nav/LeftNav.jsx";
import "./components/left-nav/LeftNav.jsx";

function App() {
  const [createBpStatus, setCreateBpStatus] = useState(false);
  const [createBpForm, setCreateBpForm] = useState({
    name: null,
    initiator_id: document.cookie.replace(
      /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ),
    project_id: null,
    deadlineDate: null,
    deadlineTime: "00:00:00",
    tasks: null,
    sample: null,
    file_id: null,
    deadline: null,
  });
  const [createTaskForm, setCreateTaskForm] = useState({
    name: null,
    begin: null,
    end: null,
    project_id: createBpForm.project_id || null,
    next_id: null,
    parent_id: null,
    prev_id: null,
    description: null,
  });
  const [filter, setFilter] = useState("id");
  const [filterMethod, setFilterMethod] = useState("asc");
  const [openTasks, setOpenTasks] = useState("");
  const [idBp, setIdBp] = useState("");
  const [bearer, setBearer] = useState(
    document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
  );
  const [createTaskStatus, setCreateTaskStatus] = useState(false);
  const [tasksList, setTasksList] = useState([]);

  return (
    <StatusContext.Provider
      value={{
        createBpStatus,
        setCreateBpStatus,
        createTaskStatus,
        setCreateTaskStatus,
        createBpForm,
        setCreateBpForm,
        createTaskForm,
        setCreateTaskForm,
        filter,
        setFilter,
        filterMethod,
        setFilterMethod,
        openTasks,
        setOpenTasks,
        idBp,
        setIdBp,
        bearer,
        tasksList,
        setTasksList,
      }}
    >
      <div className="bussines-page">
        <LeftNav />
        <div className="right-content">
          <Header />
          <BusinessMain />
        </div>
      </div>
    </StatusContext.Provider>
  );
}

export default App;
