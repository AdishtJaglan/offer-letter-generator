import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const updateStudentInfo = async () => {
  const updateInfoBtn = document.querySelectorAll(".update-btn");

  updateInfoBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();

      const { id } = e.target.dataset;
      const accessToken = localStorage.getItem("accessToken");

      const updateDialog = document.querySelector(".update-student");
      const closeDialogBtn = document.querySelector(".close-btn");

      const studentName = document.querySelector("#name");
      const studentEmail = document.querySelector("#student-email");
      const studentDomain = document.querySelector("#domain");

      const studentDateOfJoining = document.querySelector("#dateOfJoining");
      const studentDateOfCompletion =
        document.querySelector("#dateOfCompletion");

      updateDialog.showModal();

      closeDialogBtn.addEventListener("click", () => {
        updateDialog.close();
      });

      try {
        const response = await axios.get(
          `https://offer-letter-generator-zlq7.onrender.com/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          studentName.value = response.data.student_info.name;
          studentEmail.value = response.data.student_info.email;
          studentDomain.value = response.data.student_info.domain;

          studentDateOfJoining.value = formatDate(
            response.data.student_info.dateOfJoining
          );
          studentDateOfCompletion.value = formatDate(
            response.data.student_info.dateOfCompletion
          );
        } else {
          console.error("Failed to get student information");
        }
      } catch (err) {
        console.log("Error: ", err.message);
      }

      const updateStudentInfoBtn = document.querySelector(
        ".update-student-btn"
      );

      updateStudentInfoBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const updatedStudentInfo = {
          name: studentName.value,
          email: studentEmail.value,
          domain: studentDomain.value,
          dateOfJoining: new Date(studentDateOfJoining.value).toISOString(),
          dateOfCompletion: new Date(
            studentDateOfCompletion.value
          ).toISOString(),
        };

        try {
          const response = await axios.put(
            `https://offer-letter-generator-zlq7.onrender.com/student/${id}`,
            updatedStudentInfo,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            console.log("Student information updated successfully");
            updateDialog.close();
          } else {
            console.error("Failed to update student information");
          }
        } catch (err) {
          console.log("Error updating: ", err.message);
        }
      });
    });
  });
};

export const viewStudentInfo = async () => {
  const viewStudentBtn = document.querySelectorAll(".view-btn");

  viewStudentBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();

      const { id } = e.target.dataset;
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `https://offer-letter-generator-zlq7.onrender.com/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const studentName = document.querySelector(
            ".view-student-info-container p:nth-child(1)"
          );
          const studentEmail = document.querySelector(
            ".view-student-info-container p:nth-child(2)"
          );
          const studentDates = document.querySelector(
            ".view-student-info-container p:nth-child(3)"
          );
          const studentDomain = document.querySelector(
            ".view-student-info-container p:nth-child(4)"
          );
          const studentRefNo = document.querySelector(
            ".view-student-info-container p:nth-child(5)"
          );
          const studentInfoModal = document.querySelector(".view-student-info");
          const closeStudentBtn = document.querySelector(
            ".close-student-info-btn"
          );

          studentName.textContent = response.data.student_info.name;
          studentEmail.textContent = response.data.student_info.email;
          studentDates.textContent = `${formatDate(
            response.data.student_info.dateOfJoining
          )} to ${formatDate(response.data.student_info.dateOfCompletion)}`;
          studentDomain.textContent = response.data.student_info.domain;
          studentRefNo.textContent = response.data.student_info.refNo;

          studentInfoModal.showModal();

          closeStudentBtn.addEventListener("click", () => {
            studentInfoModal.close();
          });
        } else {
          console.error("Failed to get student information");
        }
      } catch (err) {
        console.log("Error fetching student info: ", err.message);
      }
    });
  });
};

export const createStudent = async () => {
  const openStudentBtn = document.querySelector(".open-student-dialog");
  const createStudentModal = document.querySelector(".create-student");
  const createStudentBtn = document.querySelector(".create-student-btn");
  const accessToken = localStorage.getItem("accessToken");

  openStudentBtn.addEventListener("click", () => {
    createStudentModal.showModal();

    const closeStudentBtn = document.querySelector(".close-student-btn");
    closeStudentBtn.addEventListener("click", () => {
      createStudentModal.close();
    });
  });

  createStudentBtn.addEventListener("click", async (e) => {
    e.stopPropagation();

    const studentName = document.querySelector("#create_name").value;
    const studentEmail = document.querySelector("#create_email").value;
    const studentDateOfJoining = document.querySelector(
      "#create_dateOfJoining"
    ).value;
    const studentDateOfCompletion = document.querySelector(
      "#create_dateOfCompletion"
    ).value;
    const studentDomain = document.querySelector("#create_domain").value;

    if (!studentDateOfCompletion || !studentDateOfJoining) {
      console.log(studentDateOfCompletion);
      console.log(studentDateOfJoining);
      console.log(studentEmail);
      console.log(studentDomain);
      console.error("Invalid dates.");
      return;
    }
    const createdStudentInfo = {
      name: studentName,
      email: studentEmail,
      domain: studentDomain,
      dateOfJoining: new Date(studentDateOfJoining).toISOString(),
      dateOfCompletion: new Date(studentDateOfCompletion).toISOString(),
    };

    try {
      const response = await axios.post(
        "https://offer-letter-generator-zlq7.onrender.com/student/create",
        createdStudentInfo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Student created successfully: ", response.data);

        document.querySelector("#create_name").value = "";
        document.querySelector("#create_email").value = "";
        document.querySelector("#create_domain").value = "";
        document.querySelector("#create_dateOfJoining").value = "";
        document.querySelector("#create_dateOfCompletion").value = "";

        createStudentModal.close();
      } else {
        console.error("Failed to create student:", response.data);
      }
    } catch (err) {
      console.log("Error reaching create student endpoint: ", err.message);
    }
  });
};
