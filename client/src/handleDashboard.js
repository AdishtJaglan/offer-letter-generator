import axios from "axios";
import downloadIcon from "./images/download.svg";
import sendIcon from "./images/send.svg";
import updateIcon from "./images/update.svg";
import viewIcon from "./images/view.svg";
import { updateStudentInfo, viewStudentInfo } from "./handleStudentInfo";
import { downloadOfferLetter, sendOfferLetter } from "./handleOfferLetter";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const logoutEvent = () => {
  const logoutBtn = document.querySelector(".sidebar p:nth-child(4)");

  logoutBtn.addEventListener("click", () => {
    window.location.reload();
  });
};

export const getStudents = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const tableBody = document.getElementById("studentTableBody");
  const previousPageBtn = document.querySelector(".previous-page");
  const nextPageBtn = document.querySelector(".next-page");

  let currentPage = 0;
  const limit = 10;

  async function fetchStudents(page) {
    const skip = page * limit;

    if (accessToken) {
      try {
        const response = await axios.get(
          `http://localhost:3000/student/info?limit=${limit}&skip=${skip}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const students = response.data;
        tableBody.innerHTML = "";

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

        previousPageBtn.disabled = currentPage === 0;
        nextPageBtn.disabled = students.length < limit;

        downloadOfferLetter();
        sendOfferLetter();
        updateStudentInfo();
        viewStudentInfo();
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }
  }

  fetchStudents(currentPage);

  nextPageBtn.addEventListener("click", () => {
    currentPage++;
    fetchStudents(currentPage);
  });

  previousPageBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      fetchStudents(currentPage);
    }
  });
};

export const toggleSidebar = () => {
  document
    .getElementById("toggleButton")
    .addEventListener("click", function () {
      document.querySelector(".sidebar").classList.toggle("minimized");
    });
};
