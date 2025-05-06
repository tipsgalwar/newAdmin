/**
 * Fetches exam results from the server, sorts by rank, and displays them.
 */
async function fetchResults() {
    try {
      const response = await fetch("https://admin-backend-wbbc.onrender.com/api/result");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const results = await response.json();
      // Sort results by rank in ascending order
      results.sort((a, b) => a.rank - b.rank);
      displayResults(results);
    } catch (error) {
      console.error("Error loading results:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load exam results.",
        icon: "error",
      });
    }
  }
  
  /**
   * Displays exam results in the table.
   */
  function displayResults(results) {
    const tableBody = document.getElementById("results-table-body");
    tableBody.innerHTML = ""; // Clear existing content
  
    if (results.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No results found.</td></tr>`;
      return;
    }
  
    results.forEach((result, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><p><b>#${result.rank}</b></p></td>
        <td><p>${result.name}</p></td>
        <td><p>${result.mobile}</p></td>
        <td><p>${result.score}</p></td>
        <td><p>${result.total}</p></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  /**
   * Searches exam results by name or mobile and displays matching results sorted by rank.
   */
  async function searchResults() {
    try {
      const searchInput = document.getElementById("searchResultInput");
      const inputValue = searchInput.value.trim().toLowerCase();
      const tableBody = document.getElementById("results-table-body");
  
      if (!inputValue) {
        Swal.fire({
          title: "Input Required!",
          text: "Please enter a name or mobile number to search.",
          icon: "warning",
        });
        return;
      }
  
      const response = await fetch("https://admin-backend-wbbc.onrender.com/api/result");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allResults = await response.json();
  
      // Filter results by name (case-insensitive) or mobile (partial match)
      const matchedResults = allResults.filter(
        (result) =>
          result.name.toLowerCase().includes(inputValue) ||
          result.mobile.includes(inputValue)
      );
  
      // Sort matched results by rank in ascending order
      matchedResults.sort((a, b) => a.rank - b.rank);
  
      tableBody.innerHTML = ""; // Clear previous content
  
      if (matchedResults.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No results found for "${inputValue}".</td></tr>`;
        return;
      }
  
      displayResults(matchedResults);
    } catch (error) {
      console.error("Error searching results:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to search exam results.",
        icon: "error",
      });
    }
  }
  
  // Event listeners for page-specific functionality
  if (window.location.pathname.includes("/Exams/ExamResult.html")) {
    document.addEventListener("DOMContentLoaded", fetchResults);
  
    const searchButton = document.getElementById("searchResult");
  
    // Search on button click
    searchButton.addEventListener("click", searchResults);
  
    // Search on Enter key press
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter" && document.activeElement === document.getElementById("searchResultInput")) {
        searchResults();
      }
    });
  }



  /**
 * Fetches exam registrations from the server, sorts by name, and displays them.
 */
async function fetchRegistrations() {
    try {
      const response = await fetch("https://admin-backend-wbbc.onrender.com/api/registration");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const registrations = await response.json();
      // Sort registrations by name in ascending order
      registrations.sort((a, b) => a.name.localeCompare(b.name));
      displayRegistrations(registrations);
    } catch (error) {
      console.error("Error loading registrations:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load exam registrations.",
        icon: "error",
      });
    }
  }
  
  /**
   * Formats a date string (e.g., "2025-04-19 09:26:22") to "April 19th, 2025 at 9:26 AM".
   */
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    // Format date as "April 19, 2025, 9:26 AM"
    const formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    // Extract day to add ordinal suffix (e.g., 19 → 19th)
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    // Replace the day number with day + suffix (e.g., "19" → "19th")
    return formattedDate.replace(/\b\d+\b/, `${day}${suffix}`);
  }
  
  /**
   * Returns the ordinal suffix for a given day (e.g., 1 → "st", 2 → "nd", 19 → "th").
   */
  function getOrdinalSuffix(day) {
    if (day % 10 === 1 && day !== 11) return 'st';
    if (day % 10 === 2 && day !== 12) return 'nd';
    if (day % 10 === 3 && day !== 13) return 'rd';
    return 'th';
  }
  
  /**
   * Displays exam registrations in the table.
   */
  function displayRegistrations(registrations) {
    const tableBody = document.getElementById("registrations-table-body");
    tableBody.innerHTML = ""; // Clear existing content
  
    if (registrations.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No registrations found.</td></tr>`;
      return;
    }
  
    registrations.forEach((registration) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><p>${registration.name}</p></td>
        <td><p>${registration.mobile}</p></td>
        <td><p>${registration.email}</p></td>
        <td><p>${registration.institute}</p></td>
        <td><p>${registration.education}</p></td>
        <td><p>${registration.city}</p></td>
        <td><p>${formatTimestamp(registration.timestamp)}</p></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  /**
   * Searches exam registrations by name, mobile, institute, or email and displays matching results sorted by name.
   */
  async function searchRegistrations() {
    try {
      const searchInput = document.getElementById("searchResultInput");
      const inputValue = searchInput.value.trim().toLowerCase();
      const tableBody = document.getElementById("registrations-table-body");
  
      if (!inputValue) {
        Swal.fire({
          title: "Input Required!",
          text: "Please enter a name, mobile number, institute, or email to search.",
          icon: "warning",
        });
        return;
      }
  
      const response = await fetch("https://admin-backend-wbbc.onrender.com/api/registration");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allRegistrations = await response.json();
  
      // Filter registrations by name, mobile, institute, or email (case-insensitive)
      const matchedRegistrations = allRegistrations.filter(
        (registration) =>
          registration.name.toLowerCase().includes(inputValue) ||
          registration.mobile.includes(inputValue) ||
          registration.institute.toLowerCase().includes(inputValue) ||
          registration.email.toLowerCase().includes(inputValue)
      );
  
      // Sort matched registrations by name in ascending order
      matchedRegistrations.sort((a, b) => a.name.localeCompare(b.name));
  
      tableBody.innerHTML = ""; // Clear previous content
  
      if (matchedRegistrations.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No registrations found for "${inputValue}".</td></tr>`;
        return;
      }
  
      displayRegistrations(matchedRegistrations);
    } catch (error) {
      console.error("Error searching registrations:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to search exam registrations.",
        icon: "error",
      });
    }
  }
  
  // Event listeners for page-specific functionality
  if (window.location.pathname.includes("/Exams/ExamRegistration.html")) {
    document.addEventListener("DOMContentLoaded", fetchRegistrations);
  
    const searchButton = document.getElementById("searchResult");
  
    // Search on button click
    searchButton.addEventListener("click", searchRegistrations);
  
    // Search on Enter key press
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter" && document.activeElement === document.getElementById("searchResultInput")) {
        searchRegistrations();
      }
    });
  }