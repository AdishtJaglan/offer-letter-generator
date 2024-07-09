import axios from "axios";
import { clearPage } from "./clearPage";
import { createDashboard } from "./createDashboard";
import spinnerIcon from "./images/spinner.gif";

export const handleLogin = () => {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userEmail = document.querySelector("#email");
    const userPassword = document.querySelector("#password");
    const loginBtn = document.querySelector(".login-button");

    try {
      loginBtn.innerHTML = `
      <img src="${spinnerIcon}" style="width: 25px;"/>
    `;

      const response = await axios.post(
        "https://offer-letter-generator-zlq7.onrender.com/auth/login",
        {
          email: userEmail.value,
          password: userPassword.value,
        }
      );

      if (response.status === 200) {
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          name: adminName,
          id: adminId,
        } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        clearPage();
        createDashboard(adminName, adminId);
      } else {
        console.error("Error logging in.");
      }
    } catch (error) {
      console.error("Error logging in: " + error.message);
    } finally {
      loginBtn.innerHTML = "";
      loginBtn.textContent = "Login";
    }

    userEmail.value = "";
    userPassword.value = "";
  });
};
