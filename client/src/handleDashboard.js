import axios from "axios";
import downloadIcon from "./images/download.svg";
import sendIcon from "./images/send.svg";
import updateIcon from "./images/update.svg";
import viewIcon from "./images/view.svg";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const logoutEvent = () => {
  const logoutBtn = document.querySelector(".sidebar p:nth-child(2)");

  logoutBtn.addEventListener("click", () => {
    window.location.reload();
  });
};

export const getStudents = async () => {
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
};

export const toggleSidebar = () => {
  document
    .getElementById("toggleButton")
    .addEventListener("click", function () {
      document.querySelector(".sidebar").classList.toggle("minimized");
    });
};
