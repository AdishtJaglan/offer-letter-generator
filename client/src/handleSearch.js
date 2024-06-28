import axios from "axios";

const createStudentInfoModal = (
  stName,
  stDomain,
  stEmail,
  stDateOfCompletion,
  stDateOfJoining
) => {
  const stContainer = document.querySelector(".display-students-container");
  const stModalContainer = document.createElement("div");
  stModalContainer.classList.add("show-student-info");

  stModalContainer.innerHTML = `
        <h3 class="student-name">${stName}</h3>
        <p class="student-domain">${stDomain}</p>
        <p class="student-email">${stEmail}</p>
        <p class="student-duration"> ${new Date(
          stDateOfJoining
        ).toLocaleDateString()} to ${new Date(
    stDateOfCompletion
  ).toLocaleDateString()}</p> 
    `;

  stContainer.appendChild(stModalContainer);
};

const showCreateInfoModal = () => {
  const stModal = document.querySelector(".display-students-dialog");
  const stModalCloseBtn = document.querySelector(
    ".display-student-header span"
  );

  stModal.showModal();
  stModalCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeStudentInfoContainers();
    stModal.close();
  });
};

const removeStudentInfoContainers = () => {
  const studentInfoContainers = document.querySelectorAll(".show-student-info");
  studentInfoContainers.forEach((container) => {
    container.remove();
  });
};

const createNoStudentFoundModal = () => {
  const stContainer = document.querySelector(".display-students-container");
  const stModalContainer = document.createElement("div");
  stModalContainer.classList.add("show-student-info");

  stModalContainer.textContent = "No such student found.";

  stContainer.appendChild(stModalContainer);
  showCreateInfoModal();
};

export const handleNameSearch = () => {
  const nameSearchBar = document.querySelector("#search_bar");
  const searchIcon = document.querySelector(".icon");

  searchIcon.addEventListener("click", async (e) => {
    if (nameSearchBar.value.trim() !== "") {
      e.stopPropagation();
      await searchStudents();
    }
  });

  nameSearchBar.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && nameSearchBar.value.trim() !== "") {
      e.stopPropagation();
      await searchStudents();
    }
  });

  const searchStudents = async () => {
    const studentName = nameSearchBar.value;
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/student/name?name=${studentName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const students = response.data;

        students.forEach((student) => {
          const {
            name: stName,
            domain: stDomain,
            dateOfJoining: stDateOfJoining,
            dateOfCompletion: stDateOfCompletion,
            email: stEmail,
          } = student;

          createStudentInfoModal(
            stName,
            stDomain,
            stEmail,
            stDateOfCompletion,
            stDateOfJoining
          );
        });

        showCreateInfoModal();
      } catch (error) {
        createNoStudentFoundModal();
        console.error(
          "Error occurred fetching students by name:" + error.message
        );
      }
    }
  };
};
