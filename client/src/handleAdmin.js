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

const makeAdminModal = () => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("create-admin-modal");
  adminModal.innerHTML = `
    <div class="create-admin-modal-container">
      <div class="create-admin-heading">
        <p>Create Admin</p>
        <span class="create-admin-close">&#10006;</span>
      </div>

      <div class="create-admin-row">
        <label for="create_admin_name">name:</label>
        <input type="text" name="name" id="create_admin_name" />
      </div>

      <div class="create-admin-row">
        <label for="create_admin_email">email:</label>
        <input type="email" name="email" id="create_admin_email" />
      </div>

      <div class="create-admin-row">
        <label for="create_admin_password">password:</label>
        <input type="password" name="password" id="create_admin_password" />
      </div>

      <button class="create-admin-info-btn">create</button>
    </div>
  `;

  body.appendChild(adminModal);
  adminModal.showModal();

  const closeCreateAdminBtn = document.querySelector(".create-admin-close");

  closeCreateAdminBtn.addEventListener("click", () => {
    adminModal.remove();
    adminModal.close();
  });
};

const showAdminDeleteModal = (admins) => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("delete-admin-modal");
  adminModal.innerHTML = `
    <div class="delete-admin-modal-container">
      <div class="delete-admin-heading">
        <p>Admin Info</p>
        <span class="delete-admin-close">&#10006;</span>
      </div>
    </div>
  `;

  body.appendChild(adminModal);

  const deleteAdminModalContainer = document.querySelector(
    ".delete-admin-modal-container"
  );

  admins.forEach((admin) => {
    const nameP = document.createElement("p");
    const deleteAdminBtn = document.createElement("button");
    const adminContainer = document.createElement("div");

    deleteAdminBtn.dataset.id = admin._id;
    deleteAdminBtn.textContent = "delete";
    deleteAdminBtn.classList.add("delete-admin-btn");

    nameP.textContent = admin.name;
    nameP.classList.add("delete-admin-name");
    adminContainer.classList.add("delete-admin-container");

    adminContainer.appendChild(nameP);
    adminContainer.appendChild(deleteAdminBtn);

    deleteAdminModalContainer.appendChild(adminContainer);
  });

  const closeButton = document.querySelector(".delete-admin-close");

  adminModal.showModal();

  closeButton.addEventListener("click", () => {
    adminModal.innerHTML = "";
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

export const createAdmin = async () => {
  const showCreateAdminModal = document.querySelector(".create-admin");

  showCreateAdminModal.addEventListener("click", () => {
    makeAdminModal();

    const createAdminBtn = document.querySelector(".create-admin-info-btn");

    createAdminBtn.addEventListener("click", async (e) => {
      e.stopPropagation();

      const adminModal = document.querySelector(".create-admin-modal");
      const adminName = document.querySelector("#create_admin_name");
      const adminEmail = document.querySelector("#create_admin_email");
      const adminPassword = document.querySelector("#create_admin_password");
      const accessToken = localStorage.getItem("accessToken");

      const adminInfo = {
        name: adminName.value,
        email: adminEmail.value,
        password: adminPassword.value,
      };

      if (accessToken) {
        try {
          const response = await axios.post(
            "http://localhost:3000/auth/register",
            adminInfo,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            adminName.value = "";
            adminEmail.value = "";
            adminPassword.value = "";

            adminModal.remove();
            adminModal.close();
          }
        } catch (e) {
          console.error("Error creating admin: ", e.message);
        }
      }
    });
  });
};

export const viewAndDeleteAdmins = () => {
  const manageAdminBtn = document.querySelector(".manage-admins");

  manageAdminBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const response = await axios.get("http://localhost:3000/auth/info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const admins = response.data.admins;

        showAdminDeleteModal(admins);
      } catch (e) {
        console.error("Error fetching admins: ", e.message);
      }
    }

    const deleteAdminBtns = document.querySelectorAll(".delete-admin-btn");

    deleteAdminBtns.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();

        const { id } = e.target.dataset;
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          try {
            const response = await axios.delete(
              `http://localhost:3000/auth/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (response.status === 200) {
              btn.closest(".delete-admin-container").remove();
            }
          } catch (e) {
            console.error("Error deleting admin: ", e.message);
          }
        }
      });
    });
  });
};
