import axios from "axios";

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
