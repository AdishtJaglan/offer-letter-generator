import "./styles/dashboardStyle.css";
import searchIcon from "./images/magnify.svg";
import logoutIcon from "./images/logout.svg";
import bellIcon from "./images/bell.svg";
import accountPlusIcon from "./images/account-plus-outline.svg";
import { createStudent } from "./handleStudentInfo";
import {
  getStudents,
  logoutEvent,
  reloadPage,
  toggleSidebar,
} from "./handleDashboard";
import {
  createAdmin,
  showAllAdmins,
  updateAdminInfo,
  viewAndDeleteAdmins,
} from "./handleAdmin";
import { handleNameSearch } from "./handleSearch";

export const createDashboard = async (adminName, adminId) => {
  const body = document.querySelector("body");

  body.innerHTML = `
    <div class="header">
      <div class="user-info">
        <div class="left-info">
          <img src="${searchIcon}" alt="" class="icon" />
          <input type="text" name="" id="search_bar" placeholder="search by name"/>
        </div>

        <div class="right-info">
          <img src="${bellIcon}" alt="" class="icon" />
          <img
            src="https://img.icons8.com/doodle/48/user-male-circle.png"
            alt=""
            class="profile-picture"
          />
          <p>${adminName}</p>
        </div>
      </div>

      <div class="nav">
        <div class="greeting-container">
          <img
            src="https://img.icons8.com/doodle/100/user-male-circle.png"
            alt=""
            class="nav-profile-picture"
          />
          <div class="greeting">
            <p>Hi There,</p>
            <p>${adminName}</p>
          </div>
        </div>

        <ul>
          <li class="open-student-dialog">New</li>
          <li data-id="${adminId}" class="update-admin">Update</li>
          <li class="manage-admins">Manage</li>
        </ul>
      </div>
    </div>

    <div class="sidebar">
      <button id="toggleButton">
        <span>&#9776;</span>
      </button>

      <p class="search-admin">
        <span><img src="${searchIcon}" alt="" class="search-icon" /></span
        ><span class="text">Search Admin</span>
      </p>
      
      <p class="create-admin">
        <span><img src="${accountPlusIcon}" class="add-admin"/></span>
        <span class="text">Add Admin</span>
      </p>

      <p class="sidebar-p">
        <span><img src="${logoutIcon}" class="logout-icon" /></span
        ><span class="text">Logout</span>
      </p>
    </div>

    <div class="main-content">
      <div class="pagination-buttons">
        <button class="reload-page">reload</button>
        <button class="previous-page">Previous</button>
        <button class="next-page">Next</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Domain</th>
            <th>From</th>
            <th>To</th>
            <th>UID</th>
            <th>View</th>
            <th>Update</th>
            <th>Send</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody id="studentTableBody">
        </tbody>
      </table>
    </div>  

    <dialog class="update-student">
      <div class="update-student-container">
        <div class="form-row">
          <label for="name">Name:</label>
          <input type="text" id="name"/>
        </div>

        <div class="form-row">
          <label for="student-email">Email:</label>
          <input type="email" id="student-email" />
        </div>

        <div class="form-row">
          <label for="dateOfJoining">Date of Joining:</label>
          <input type="date" id="dateOfJoining" />
        </div>

        <div class="form-row">
          <label for="dateOfCompletion">Date of Completion:</label>
          <input type="date" id="dateOfCompletion" />
        </div>

        <div class="form-row">
          <label for="domain">Domain:</label>
          <input type="text" id="domain" />
        </div>

        <div class="btns">
          <button class="update-student-btn">Update</button>
          <button class="close-btn">Close</button>
        </div>
      </div>
    </dialog>

    <dialog class="view-student-info">
      <div class="view-student-info-container">
        <div class="view-student-heading">
          <h2>
            Student Information
          </h2>
        </div>
        <div class="student-info-row">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <button class="close-student-info-btn">Close</button>
      </div>
    </dialog>

    <dialog class="create-student">
      <div class="create-student-container">
        <div class="row">
          <p class="create-student-heading">Create Student</p>
        </div>

        <div class="row">
          <label for="create_name">Name:</label>
          <input type="text" id="create_name" name="name" placeholder="enter name" required />
        </div>

        <div class="row">
          <label for="create_email">Email:</label>
          <input type="email" id="create_email" name="email" placeholder="enter email" required />
        </div>

        <div class="date-row">
          <div class="dateOfJoining-group">
            <label for="create_dateOfJoining">Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              id="create_dateOfJoining"
              required
            />
          </div>

          <div class="dateOfCompletion-group">
            <label for="create_dateOfCompletion">Date of Completion:</label>
            <input
              type="date"
              name="dateOfCompletion"
              id="create_dateOfCompletion"
              required
            />
          </div>
        </div>

         <div class="row">
          <label for="create_domain">Domain:</label>
          <input list="domains" id="create_domain" name="domain" placeholder="Select or type a domain" required />
          <datalist id="domains">
            <option value="Marketing"></option>
            <option value="Social worker"></option>
            <option value="Public Relations"></option>
            <option value="Campus Ambassador"></option>
            <option value="Machine Learning"></option>
            <option value="Data Science"></option>
            <option value="Artificial Intelligence"></option>
            <option value="Web Developer"></option>
            <option value="Fundraising Coordinator"></option>
            <option value="Volunteer"></option>
            <option value="Coding Tutor"></option>
            <option value="Human Resource Management"></option>
            <option value="Social Media Marketing"></option>
            <option value="Digital Marketing"></option>
            <option value="Business Development Associate"></option>
            <option value="Content Writer"></option>
          </datalist>
         </div>

        <div class="student-btns">
          <button class="create-student-btn">Submit</button>
          <button class="close-student-btn">Close</button>
        </div>
      </div>
    </dialog>

    <dialog class="display-students-dialog">
      <div class="display-students-container">
        <div class="display-student-header">
          <h1>Student Info</h1>
          <span>&#10006;</span>
        </div>
      </div>
    </dialog>
    `;

  handleNameSearch();
  getStudents();
  reloadPage();
  toggleSidebar();
  createStudent();
  logoutEvent();
  showAllAdmins();
  updateAdminInfo();
  createAdmin();
  viewAndDeleteAdmins();
};
