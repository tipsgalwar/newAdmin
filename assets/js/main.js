(function () {
  /* ========= Preloader ======== */
  const preloader = document.querySelectorAll("#preloader");

  window.addEventListener("load", function () {
    if (preloader.length) {
      this.document.getElementById("preloader").style.display = "none";
    }
  });

  /* ========= Add Box Shadow in Header on Scroll ======== */
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 0) {
      header.style.boxShadow = "0px 0px 30px 0px rgba(200, 208, 216, 0.30)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  /* ========= sidebar toggle ======== */
  const sidebarNavWrapper = document.querySelector(".sidebar-nav-wrapper");
  const mainWrapper = document.querySelector(".main-wrapper");
  const menuToggleButton = document.querySelector("#menu-toggle");
  const menuToggleButtonIcon = document.querySelector("#menu-toggle i");
  const overlay = document.querySelector(".overlay");

  menuToggleButton.addEventListener("click", () => {
    sidebarNavWrapper.classList.toggle("active");
    overlay.classList.add("active");
    mainWrapper.classList.toggle("active");

    if (document.body.clientWidth > 1200) {
      if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
        menuToggleButtonIcon.classList.remove("lni-chevron-left");
        menuToggleButtonIcon.classList.add("lni-menu");
      } else {
        menuToggleButtonIcon.classList.remove("lni-menu");
        menuToggleButtonIcon.classList.add("lni-chevron-left");
      }
    } else {
      if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
        menuToggleButtonIcon.classList.remove("lni-chevron-left");
        menuToggleButtonIcon.classList.add("lni-menu");
      }
    }
  });
  overlay.addEventListener("click", () => {
    sidebarNavWrapper.classList.remove("active");
    overlay.classList.remove("active");
    mainWrapper.classList.remove("active");
  });
})();

// async function fetchData() {
//   try {
//     const blogResponse = await fetch(
//       "https://admin-backend-wbbc.onrender.com/api/blogs"
//     );
//     const contactResponse = await fetch(
//       "https://admin-backend-wbbc.onrender.com/api/contact"
//     );
//     const registrationResponse = await fetch(
//       "https://admin-backend-wbbc.onrender.com/api/registration"
//     );

//     const blogData = await blogResponse.json();
//     const contactData = await contactResponse.json();
//     const registrationData = await registrationResponse.json();
//     // console.log(blogData);
//     // console.log(contactData);
//     // console.log(registrationData);
//     return { blogData, contactData, registrationData };
//   } catch (error) {
//     console.log("failed to fetch data");
//   }
// }
// async function searchRegistrations(inputElement, tableBody, data) {
//   try {
//     // const searchInput = document.getElementById("searchResultInput");
//     const inputValue = inputElement.value.trim().toLowerCase();
//     // const tableBody = document.getElementById("registrations-table-body");

//     if (!inputValue) {
//       Swal.fire({
//         title: "Input Required!",
//         text: "Please enter a name, mobile number, institute, or email to search.",
//         icon: "warning",
//       });
//       return;
//     }
//     const matchedRegistrations = allRegistrations.filter(
//       (registration) =>
//         registration.name.toLowerCase().includes(inputValue) ||
//         registration.mobile.includes(inputValue) ||
//         registration.institute.toLowerCase().includes(inputValue) ||
//         registration.email.toLowerCase().includes(inputValue)
//     );

//     // Sort matched registrations by name in ascending order
//     matchedRegistrations.sort((a, b) => a.name.localeCompare(b.name));

//     tableBody.innerHTML = ""; // Clear previous content

//     if (matchedRegistrations.length === 0) {
//       tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No registrations found for "${inputValue}".</td></tr>`;
//       return;
//     }

//     // displayRegistrations(matchedRegistrations);
//   } catch (error) {
//     console.error("Error searching registrations:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "Failed to search exam registrations.",
//       icon: "error",
//     });
//   }
// }

// if (window.location.pathname == "/Home.html") {
//   window.onload = async () => {
//     const allData = await fetchData();

//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     // For blog updatedAt
//     const blogDate = new Date(allData.blogData[0].updatedAt);
//     const formattedBlogDate = blogDate
//       .toLocaleDateString("en-GB", options)
//       .replace(/ /g, " ");
//     // For contact updatedAt
//     const contactDate = new Date(allData.contactData[0].updatedAt);
//     const formattedContactDate = contactDate
//       .toLocaleDateString("en-GB", options)
//       .replace(/ /g, " ");
//     // For contact updatedAt
//     const allStudentsDate = new Date(allData.contactData[0].updatedAt);
//     const formattedallStudentsDate = allStudentsDate
//       .toLocaleDateString("en-GB", options)
//       .replace(/ /g, " ");

//     document.getElementById("totalblogs").textContent = allData.blogData.length;
//     document.getElementById("blogtime").textContent = formattedBlogDate;
//     document.getElementById("totalwebsitequery").textContent =
//       allData.contactData.length;
//     document.getElementById("lastquery").textContent = formattedContactDate;
//     document.getElementById("allstudents").textContent =
//       allData.registrationData.length;
//     document.getElementById("allstudentstime").textContent =
//       formattedallStudentsDate;
//   };
// }

// function formatTimestamp(timestamp) {
//   const date = new Date(timestamp);
//   // Format date as "April 19, 2025, 9:26 AM"
//   const formattedDate = date.toLocaleString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
//   // Extract day to add ordinal suffix (e.g., 19 → 19th)
//   const day = date.getDate();
//   const suffix = getOrdinalSuffix(day);
//   // Replace the day number with day + suffix (e.g., "19" → "19th")
//   return formattedDate.replace(/\b\d+\b/, `${day}${suffix}`);
// }

// /**
//  * Returns the ordinal suffix for a given day (e.g., 1 → "st", 2 → "nd", 19 → "th").
//  */
// function getOrdinalSuffix(day) {
//   if (day % 10 === 1 && day !== 11) return "st";
//   if (day % 10 === 2 && day !== 12) return "nd";
//   if (day % 10 === 3 && day !== 13) return "rd";
//   return "th";
// }

// if (window.location.pathname == "/website/contactform.html") {
//   window.onload = async () => {
//     const { contactData } = await fetchData();
//     console.log(contactData);
//     function displayData(contactData) {
//       const tableBody = document.getElementById("contact-table-body");
//       tableBody.innerHTML = ""; // Clear existing content

//       if (contactData.length === 0) {
//         tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No results found.</td></tr>`;
//         return;
//       }

//       contactData.forEach((result, index) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//         <td><p><b>${result.name}</b></p></td>
//         <td><p>${result.number}</p></td>
//         <td><p>${result.email}</p></td>
//         <td><p>${result.subject}</p></td>
//         <td><p>${result.message}</p></td>
//         <td><p>${result.qualification}</p></td>
//         <td><p>${formatTimestamp(result.updatedAt)}</p></td>
//       `;
//         tableBody.appendChild(row);
//       });
//     }
//     displayData(contactData);
//   };
// }


async function fetchData() {
  try {
    const blogResponse = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs");
    const contactResponse = await fetch("https://admin-backend-wbbc.onrender.com/api/contact");
    const registrationResponse = await fetch("https://admin-backend-wbbc.onrender.com/api/registration");

    const blogData = await blogResponse.json();
    const contactData = await contactResponse.json();
    const registrationData = await registrationResponse.json();
    return { blogData, contactData, registrationData };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to fetch data from the server.",
      icon: "error",
    });
    return { blogData: [], contactData: [], registrationData: [] };
  }
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  return formattedDate.replace(/\b\d+\b/, `${day}${suffix}`);
}

function getOrdinalSuffix(day) {
  if (day % 10 === 1 && day !== 11) return "st";
  if (day % 10 === 2 && day !== 12) return "nd";
  if (day % 10 === 3 && day !== 13) return "rd";
  return "th";
}

async function globalSearch(inputElement, tableBody) {
  try {
    const inputValue = inputElement.value.trim().toLowerCase();
    const pathname = window.location.pathname;

    // if (!inputValue) {
    //   Swal.fire({
    //     title: "Input Required!",
    //     text: "Please enter a search term.",
    //     icon: "warning",
    //   });
    //   return;
    // }

    const { blogData, contactData, registrationData } = await fetchData();
    tableBody.innerHTML = ""; // Clear previous content

    if (pathname.includes("Home.html")) {
      // Search blogs on Home page
      const matchedBlogs = blogData.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(inputValue) ||
          blog.content?.toLowerCase().includes(inputValue)
      ).sort((a, b) => a.title.localeCompare(b.title));

      if (matchedBlogs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" class="text-center">No blogs found for "${inputValue}".</td></tr>`;
        return;
      }

      matchedBlogs.forEach((blog) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><p><b>${blog.title}</b></p></td>
          <td><p>${blog.content.substring(0, 100)}...</p></td>
          <td><p>${formatTimestamp(blog.updatedAt)}</p></td>
        `;
        tableBody.appendChild(row);
      });

    } else if (pathname.includes("contactform.html")) {
      // Search contacts on contactform page
      const matchedContacts = contactData.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(inputValue) ||
          contact.number?.includes(inputValue) ||
          contact.email?.toLowerCase().includes(inputValue) ||
          contact.subject?.toLowerCase().includes(inputValue) ||
          contact.message?.toLowerCase().includes(inputValue) ||
          contact.qualification?.toLowerCase().includes(inputValue)
      ).sort((a, b) => a.name.localeCompare(b.name));

      if (matchedContacts.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No contacts found for "${inputValue}".</td></tr>`;
        return;
      }

      matchedContacts.forEach((contact) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><p><b>${contact.name}</b></p></td>
          <td><p>${contact.number}</p></td>
          <td><p>${contact.email}</p></td>
          <td><p>${contact.subject}</p></td>
          <td><p>${contact.message}</p></td>
          <td><p>${contact.qualification}</p></td>
          <td><p>${formatTimestamp(contact.updatedAt)}</p></td>
        `;
        tableBody.appendChild(row);
      });

    } else if (pathname.includes("ExamRegistration.html")) {
      // Search registrations on registrations page
      const matchedRegistrations = registrationData.filter(
        (registration) =>
          registration.name?.toLowerCase().includes(inputValue) ||
          registration.mobile?.includes(inputValue) ||
          registration.institute?.toLowerCase().includes(inputValue) ||
          registration.email?.toLowerCase().includes(inputValue)
      ).sort((a, b) => a.name.localeCompare(b.name));

      if (matchedRegistrations.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No registrations found for "${inputValue}".</td></tr>`;
        return;
      }

      matchedRegistrations.forEach((registration) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><p><b>${registration.name}</b></p></td>
          <td><p>${registration.mobile}</p></td>
          <td><p>${registration.institute}</p></td>
          <td><p>${registration.email}</p></td>
          <td><p>${formatTimestamp(registration.updatedAt)}</p></td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      Swal.fire({
        title: "Invalid Page!",
        text: "Search functionality is not available on this page.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error in global search:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to perform search.",
      icon: "error",
    });
  }
}

// Initialize page-specific logic
window.onload = async () => {
  const pathname = window.location.pathname;
  const { blogData, contactData, registrationData } = await fetchData();

  if (pathname.includes("Home.html")) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const blogDate = new Date(blogData[0]?.updatedAt || Date.now());
    const formattedBlogDate = blogDate.toLocaleDateString("en-GB", options).replace(/ /g, " ");
    const contactDate = new Date(contactData[0]?.updatedAt || Date.now());
    const formattedContactDate = contactDate.toLocaleDateString("en-GB", options).replace(/ /g, " ");
    const allStudentsDate = new Date(registrationData[0]?.updatedAt || Date.now());
    const formattedallStudentsDate = allStudentsDate.toLocaleDateString("en-GB", options).replace(/ /g, " ");

    document.getElementById("totalblogs").textContent = blogData.length;
    document.getElementById("blogtime").textContent = formattedBlogDate;
    document.getElementById("totalwebsitequery").textContent = contactData.length;
    document.getElementById("lastquery").textContent = formattedContactDate;
    document.getElementById("allstudents").textContent = registrationData.length;
    document.getElementById("allstudentstime").textContent = formattedallStudentsDate;

  } else if (pathname.includes("contactform.html")) {
    const tableBody = document.getElementById("contact-table-body");
    if (contactData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No results found.</td></tr>`;
    } else {
      contactData.forEach((contact) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><p><b>${contact.name}</b></p></td>
          <td><p>${contact.number}</p></td>
          <td><p>${contact.email}</p></td>
          <td><p>${contact.subject}</p></td>
          <td><p>${contact.message}</p></td>
          <td><p>${contact.qualification}</p></td>
          <td><p>${formatTimestamp(contact.updatedAt)}</p></td>
        `;
        tableBody.appendChild(row);
      });
    }

  } else if (pathname.includes("ExamResult.html")) {
    const tableBody = document.getElementById("registrations-table-body");
    if (registrationData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No registrations found.</td></tr>`;
    } else {
      registrationData.forEach((registration) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><p><b>${registration.name}</b></p></td>
          <td><p>${registration.mobile}</p></td>
          <td><p>${registration.institute}</p></td>
          <td><p>${registration.email}</p></td>
          <td><p>${formatTimestamp(registration.updatedAt)}</p></td>
        `;
        tableBody.appendChild(row);
      });
    }
  }

  // Attach search event listener
  const searchInput = document.getElementById("searchResultInput");
  const tableBody = document.getElementById("contact-table-body") || 
                    document.getElementById("registrations-table-body") || 
                    document.getElementById("blog-table-body");
  if (searchInput && tableBody) {
    searchInput.addEventListener("input", () => globalSearch(searchInput, tableBody));
  }
};