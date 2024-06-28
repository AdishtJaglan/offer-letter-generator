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
      .post(`https://offer-letter-generator-zlq7.onrender.com/auth/login`, {
        email: userEmail.value,
        password: userPassword.value,
      })
      .then((res) => {
        let accessToken = res.data.access_token;
        let refreshToken = res.data.refresh_token;
        let adminName = res.data.name;
        let adminId = res.data.id;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        clearPage();
        createDashboard(adminName, adminId);
      })
      .catch((err) => {
        console.log("error response: ", err.response);
      });

    userEmail.value = "";
    userPassword.value = "";
  });
};
