import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const downloadOfferLetter = async () => {
  const downloadBtns = document.querySelectorAll(".download-btn");

  downloadBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();

      const { id } = e.target.dataset;
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/offer-letter/download/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `${id}.pdf`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      } catch (err) {
        console.log("Error: ", err.response);
      }
    });
  });
};

export const sendOfferLetter = async () => {
  const sendLetterBtns = document.querySelectorAll(".send-btn");

  sendLetterBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();

      const { id } = e.target.dataset;
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/offer-letter/send/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          alert("Email sent successfully.");
        } else {
          console.error("Failed to send email");
          alert("Failed to send email.");
        }
      } catch (err) {
        console.log("Error: ", err.response);
      }
    });
  });
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
          `http://localhost:3000/student/${id}`,
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

        console.log(updatedStudentInfo);

        try {
          const response = await axios.put(
            `http://localhost:3000/student/${id}`,
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
