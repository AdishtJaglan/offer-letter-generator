import "./styles/dashboardStyle.css";
import axios from "axios";
import searchIcon from "./images/magnify.svg";
import logoutIcon from "./images/logout.svg";
import bellIcon from "./images/bell.svg";
import downloadIcon from "./images/download.svg";
import sendIcon from "./images/send.svg";
import updateIcon from "./images/update.svg";
import viewIcon from "./images/view.svg";
import { downloadOfferLetter } from "./handleDashboardEvent";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const createDashboard = async () => {
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
        <tbody id="studentTableBody">
        </tbody>
      </table>
    `;

  document
    .getElementById("toggleButton")
    .addEventListener("click", function () {
      document.querySelector(".sidebar").classList.toggle("minimized");
    });

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    try {
      const response = await axios.get("http://localhost:3000/student/info", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const students = response.data;
      const tableBody = document.getElementById("studentTableBody");

      students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.domain}</td>
          <td>${formatDate(student.dateOfJoining)}</td>
          <td>${formatDate(student.dateOfCompletion)}</td>
          <td>${student.refNo}</td>
          <td>
            <button data-id="${student._id}" class="view-btn">
              <img data-id="${
                student._id
              }" class="table-icons" src="${viewIcon}" alt="View">
            </button>
          </td>
          <td>
            <button data-id="${student._id}" class="update-btn">
              <img data-id="${
                student._id
              }" class="table-icons" src="${updateIcon}" alt="Update">
            </button>
          </td>
          <td>
            <button data-id="${student._id}" class="send-btn">
              <img data-id="${
                student._id
              }" class="table-icons" src="${sendIcon}" alt="Send">
            </button>
          </td>
          <td>
            <button data-id="${student._id}" class="download-btn">
              <img data-id="${
                student._id
              }" class="table-icons" src="${downloadIcon}" alt="Download">
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  downloadOfferLetter();
};
