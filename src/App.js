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
    initiator_id: null,
    project_id: null,
    deadlineDate: null,
    deadlineTime: null,
    tasks: null,
  });
  const [filter, setFilter] = useState("id");
  const [filterMethod, setFilterMethod] = useState("asc");
  const [openTasks, setOpenTasks] = useState("");
  const [openForm, setOpenForm] = useState("");

  return (
    <StatusContext.Provider
      value={{
        createBpStatus,
        setCreateBpStatus,
        createBpForm,
        setCreateBpForm,
        filter,
        setFilter,
        filterMethod,
        setFilterMethod,
        openTasks,
        setOpenTasks,
        openForm,
        setOpenForm,
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
