import axios from "axios";
import spinnerIcon from "./images/spinner.gif";
import sendIcon from "./images/send.svg";

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
      const spinnerIconImg = document.querySelector(
        `button.send-btn[data-id="${id}"] img.table-icons`
      );
      const accessToken = localStorage.getItem("accessToken");

      try {
        spinnerIconImg.src = spinnerIcon;

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
        } else {
          console.error("Failed to send email");
        }
      } catch (err) {
        console.log("Error: ", err.response);
      } finally {
        spinnerIconImg.src = sendIcon;
      }
    });
  });
};
