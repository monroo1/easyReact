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

    axios
      .post(
        `https://easytaskbp.tk/api/v1/login_and_get_key?isAuth=${payload.isAuth}&secret_key=${payload.secret_key}&userId=${payload.userId}&isAdmin=${payload.isAdmin}`
      )
      .then((response) => {
        return (document.cookie = `access_token_jwt=${response.data}`);
      });
  })
  .catch(function (error) {
    console.log(error);
  });

axios
  .get("https://test.easy-task.ru/api/v1/tasks?task_id=5823", {
    headers: {
      Authorization:
        "Bearer " +
        document.cookie.replace(
          /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        ),
    },
  })
  .then((res) => console.log(res));

root.render(<App />);
