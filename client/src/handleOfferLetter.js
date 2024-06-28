import axios from "axios";
import spinnerIcon from "./images/spinner.gif";
import sendIcon from "./images/email-dark.svg";

const displayResultModal = (message) => {
  const body = document.querySelector("body");
  const resultModal = document.createElement("dialog");
  const resultModalContainer = document.createElement("div");

  body.appendChild(resultModal);
  resultModal.appendChild(resultModalContainer);

  const emailStatus = document.createElement("h2");
  const resultP = document.createElement("p");
  const closeModal = document.createElement("span");
  const resultContainer = document.createElement("div");

  resultContainer.appendChild(emailStatus);
  resultContainer.appendChild(closeModal);

  emailStatus.textContent = "Status of Email";
  resultP.textContent = message;
  closeModal.innerHTML = "&#10006;";

  resultModal.classList.add("email-result-modal");
  resultModalContainer.classList.add("email-result-container");
  emailStatus.classList.add("email-status");
  resultP.classList.add("email-result");
  closeModal.classList.add("email-status-close");
  resultContainer.classList.add("result-container");

  resultModalContainer.appendChild(resultContainer);
  resultModalContainer.appendChild(resultP);

  resultModal.appendChild(resultModalContainer);
  resultModal.showModal();

  closeModal.addEventListener("click", () => {
    resultModal.close();
  });
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
          `${process.env.API_URL}/offer-letter/download/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "blob",
          }
        );

        const studentResponse = await axios.get(
          `${process.env.API_URL}/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const studentName = studentResponse.data.student_info.name;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `${studentName}.pdf`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      } catch (err) {
        console.log("Error: ", err.message);
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
      const spinnerIconImg = document.querySelector(
        `button.send-btn[data-id="${id}"] img.table-icons`
      );
      const accessToken = localStorage.getItem("accessToken");

      try {
        spinnerIconImg.src = spinnerIcon;

        const response = await axios.get(
          `${process.env.API_URL}/offer-letter/send/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          displayResultModal("Email sent successfully!");
        } else {
          console.error("Failed to send email");
          displayResultModal(
            "Email not sent. Check credentials and try again."
          );
        }
      } catch (err) {
        console.log("Error: ", err.response);
      } finally {
        spinnerIconImg.src = sendIcon;
      }
    });
  });
};
