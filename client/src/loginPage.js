import axios from "axios";
import { clearPage } from "./clearPage";
import { createDashboard } from "./createDashboard";

export const handleLogin = () => {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userEmail = document.querySelector("#email");
    const userPassword = document.querySelector("#password");

    axios
      .post("http://localhost:3000/auth/login", {
        email: userEmail.value,
        password: userPassword.value,
      })
      .then((res) => {
        console.log("Refresh Token:", res.data.refresh_token);
        console.log("Access Token:", res.data.access_token);
        clearPage();
        createDashboard();
      })
      .catch((err) => {
        console.log("error response: ", err.response);
      });

    userEmail.value = "";
    userPassword.value = "";
  });
};
