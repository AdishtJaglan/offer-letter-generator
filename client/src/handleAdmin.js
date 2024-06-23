import axios from "axios";

const createAdminModal = (admins) => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("admin-modal");
  adminModal.innerHTML = `
    <div class="admin-modal-container">
      <div class="admin-heading">
        <p>Admin Info</p>
        <span class="admin-info-close">&#10006;</span>
      </div>
    </div>
  `;

  body.appendChild(adminModal);

  const adminModalContainer = document.querySelector(".admin-modal-container");

  admins.forEach((admin) => {
    const nameP = document.createElement("p");
    const emailP = document.createElement("p");
    const adminContainer = document.createElement("div");

    nameP.textContent = admin.name;
    emailP.textContent = admin.email;

    nameP.classList.add("admin-name");
    emailP.classList.add("admin-email");
    adminContainer.classList.add("admin-container");

    adminContainer.appendChild(nameP);
    adminContainer.appendChild(emailP);

    adminModalContainer.appendChild(adminContainer);
  });

  const closeButton = document.querySelector(".admin-info-close");

  adminModal.showModal();

  closeButton.addEventListener("click", () => {
    adminModal.innerHTML = "";
    adminModal.close();
  });
};

export const showAllAdmins = () => {
  const searchAdmin = document.querySelector(".search-admin");
  const accessToken = localStorage.getItem("accessToken");

  searchAdmin.addEventListener("click", async (e) => {
    e.stopPropagation();

    if (accessToken) {
      try {
        const response = await axios.get("http://localhost:3000/auth/info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const admins = response.data.admins;

        createAdminModal(admins);
      } catch (e) {
        console.log("Error fetching admin information: ", e.message);
      }
    }
  });
};
