import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

fetch("https://test.easy-task.ru/api/v1/login", {
  method: "POST",
  body: JSON.stringify({
    email: "varo@mastercr.ru",
    password: "N3z51bMN",
  }),
})
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    document.cookie = `access_token=${res.access_token}`;
    document.cookie = `user_id=${res.user_id}`;
    document.cookie = `company_id=${res.company_id}`;

    axios
      .get("https://test.easy-task.ru/api/v1/roles", {
        headers: {
          Authorization:
            "Bearer " +
            document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            ),
        },
      })
      .then((res) => res.data.data.filter((el) => el.id === 1))
      .then((r) => {
        console.log();
        if (r[0].id) {
          document.cookie = `isAdmin=${true}`;
        } else {
          document.cookie = `isAdmin=${true}`;
        }
      });

    const payload = {
      secret_key:
        "kN6Gd9LpZBhpMbZNzVlAOsXLkIB7cZS36McLID2W7LJOU2GiweRxpuchNoiEg8ND8PI5Pf_easyTask",
      isAuth: document.cookie.replace(
        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
        ? true
        : false,
      userId: document.cookie.replace(
        /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ),
      isAdmin: document.cookie.replace(
        /(?:(?:^|.*;\s*)isAdmin\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ),
    };

    console.log(payload.isAdmin);

    axios
      .post(
        `https://c7906cf31bcd4e.lhrtunnel.link/api/v1/login_and_get_key?isAuth=${payload.isAuth}&secret_key=${payload.secret_key}&userId=${payload.userId}&isAdmin=${payload.isAdmin}`
      )
      .then((response) => {
        console.log("jwt");
        return (document.cookie = `access_token_jwt=${response.data}`);
      });

    // fetch("https://test.easy-task.ru/api/v1/tasks", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + res.access_token,
    //     "company-id": 1,
    //   },
    //   body: JSON.stringify({
    //     begin: "13-01-2021 12:54:01",
    //     description: "бп 1",
    //     end: "15-01-2021 13:54:05",
    //     executor_id: 513,
    //     name: "цикл 1001",
    //     next_id: null,
    //     parent_id: null,
    //     prev_id: null,
    //     priority_id: 2,
    //     project_id: 2,
    //     project_section_id: 4,
    //     provide_to: 0,
    //     status_id: 2,
    //     task_load: 5,
    //     work_load: 50,
    //     workflow_id: 1,
    //     company_id: 1,
    //     business_process_id: 1,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((r) => console.log(r));

    // fetch("https://test.easy-task.ru/api/v1/tasks?project_id=35", {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + res.access_token,
    //   },
    // }).then((res) => console.log(res.json()));

    // "https://test.easy-task.ru/api/v1/users/512/companies"

    // https://d0c0a335401cc2.lhrtunnel.link/api/v1getSampleWithOptions/1
  })
  .catch(function (error) {
    console.log(error);
  });

root.render(<App />);
