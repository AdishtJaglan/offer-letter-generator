import axios from "axios";
import {
  createAdminModal,
  createUpdateAdminModal,
  makeAdminModal,
  showAdminDeleteModal,
} from "./handleAdminHelpers";

export const showAllAdmins = () => {
  const searchAdmin = document.querySelector(".search-admin");
  const accessToken = localStorage.getItem("accessToken");

  searchAdmin.addEventListener("click", async (e) => {
    e.stopPropagation();

    if (accessToken) {
      try {
        const response = await axios.get(`${process.env.API_URL}/auth/info`, {
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
          `https://offer-letter-generator-zlq7.onrender.com/auth/info/${id}`,
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
            `https://offer-letter-generator-zlq7.onrender.com/auth/update/${id}`,
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
            "https://offer-letter-generator-zlq7.onrender.com/auth/register",
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
        const response = await axios.get(
          `https://offer-letter-generator-zlq7.onrender.com/auth/info`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

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
              `https://offer-letter-generator-zlq7.onrender.com/auth/delete/${id}`,
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
