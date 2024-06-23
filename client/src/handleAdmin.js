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
    adminModal.close();
    adminModal.remove();
  });
};

const createUpdateAdminModal = (admin) => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("update-admin-modal");
  adminModal.innerHTML = `
    <div class="update-admin-modal-container">
      <div class="update-admin-heading">
        <p>Admin Info</p>
        <span class="update-admin-info-close">&#10006;</span>
      </div>

      <div class="update-admin-row">
        <label for="admin_name">name:</label>
        <input type="text" name="name" id="admin_name" />
      </div>

      <div class="update-admin-row">
        <label for="admin_email">email:</label>
        <input type="email" name="email" id="admin_email" />
      </div>

      <div class="update-admin-row">
        <label for="admin_password">password:</label>
        <input type="password" name="password" id="admin_password" />
      </div>

      <button class="update-admin-info-btn">update</button>
    </div>
  `;

  body.appendChild(adminModal);

  const adminName = document.querySelector("#admin_name");
  const adminEmail = document.querySelector("#admin_email");
  const adminPassword = document.querySelector("#admin_password");
  const closeUdpateAdminBtn = document.querySelector(
    ".update-admin-info-close"
  );

  adminEmail.value = admin.email;
  adminName.value = admin.name;
  adminPassword.value = "";

  adminModal.showModal();

  closeUdpateAdminBtn.addEventListener("click", () => {
    adminModal.close();
    adminModal.remove();
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

export const updateAdminInfo = () => {
  const updateAdmin = document.querySelector(".update-admin");

  updateAdmin.addEventListener("click", async (e) => {
    e.stopPropagation();

    const { id } = e.target.dataset;
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/info/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const admin = response.data.findAdmin;

        createUpdateAdminModal(admin);
      } catch (e) {
        console.error("Error reaching update api endpoint: ", e.message);
      }
    }

    const updateAdminInfoBtn = document.querySelector(".update-admin-info-btn");

    updateAdminInfoBtn.addEventListener("click", async () => {
      const adminName = document.querySelector("#admin_name");
      const adminEmail = document.querySelector("#admin_email");
      const adminPassword = document.querySelector("#admin_password");

      const updatedAdminInfo = {
        name: adminName.value,
        email: adminEmail.value,
      };

      if (adminPassword.value.trim() !== "") {
        updatedAdminInfo.password = adminPassword.value;
      }

      if (accessToken) {
        try {
          const response = await axios.put(
            `http://localhost:3000/auth/update/${id}`,
            updatedAdminInfo,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            console.log("information updated successfully.");

            const adminModal = document.querySelector(".update-admin-modal");
            if (adminModal) {
              adminModal.close();
              adminModal.remove();
            }
          } else {
            console.error("Failed to update admin information");
          }
        } catch (e) {
          console.error("Error fetching update API: ", e.message);
        }
      }
    });
  });
};
