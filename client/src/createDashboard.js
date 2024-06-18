import "./styles/dashboardStyle.css";
import searchIcon from "./images/magnify.svg";
import logoutIcon from "./images/logout.svg";
import bellIcon from "./images/bell.svg";

export const createDashboard = () => {
  const body = document.querySelector("body");

  body.innerHTML = `
    <div class="header">
      <div class="user-info">
        <div class="left-info">
          <img src="${searchIcon}" alt="" class="icon" />
          <input type="text" name="" id="search_bar" />
        </div>

        <div class="right-info">
          <img src="${bellIcon}" alt="" class="icon" />
          <img
            src="https://img.icons8.com/doodle/48/user-male-circle.png"
            alt=""
            class="profile-picture"
          />
          <p>Adisht Jaglan</p>
        </div>
      </div>

      <div class="nav">
        <div class="greeting-container">
          <img
            src="https://img.icons8.com/doodle/100/user-male-circle.png"
            alt=""
            class="nav-profile-picture"
          />
          <div class="greeting">
            <p>Hi there,</p>
            <p>Adisht Jaglan</p>
          </div>
        </div>

        <ul>
          <li>New</li>
          <li>Update</li>
          <li>Manage</li>
        </ul>
      </div>
    </div>

    <div class="sidebar">
      <button id="toggleButton">
        <span>&#9776;</span>
      </button>

      <p>
        <span><img src="${searchIcon}" alt="" class="search-icon" /></span
        ><span class="text">search admin</span>
      </p>

      <p class="sidebar-p">
        <span><img src="${logoutIcon}" class="logout-icon" /></span
        ><span class="text">logout</span>
      </p>
    </div>

    <div class="main-content">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Domain</th>
            <th>From</th>
            <th>To</th>
            <th>UID</th>
            <th>View</th>
            <th>Update</th>
            <th>Send</th>
            <th>Download</th>
          </tr>
        </thead>
      </table>
    `;

  document
    .getElementById("toggleButton")
    .addEventListener("click", function () {
      document.querySelector(".sidebar").classList.toggle("minimized");
    });
};
