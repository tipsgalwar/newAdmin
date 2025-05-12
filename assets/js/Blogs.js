// async function uploadBlog() {
//   event.preventDefault();

//   let title = document.getElementById("title").value;
//   let metaDescription = document.getElementById("metaDescription").value;
//   let author = document.getElementById("author").value;
//   let image1 = document.getElementById("image1").files[0];
//   let content1 = document.getElementById("content1").value;
//   let image2 = document.getElementById("image2").files[0];
//   let content2 = document.getElementById("content2").value;

//   if (!image1 || !image2) {
//     Swal.fire({
//       title: "Missing Image!",
//       text: "Please upload both images before submitting.",
//       icon: "warning",
//     });
//     return;
//   }

//   let formData = new FormData();
//   formData.append("title", title);
//   formData.append("metaDescription", metaDescription);
//   formData.append("author", author);
//   formData.append("image1", image1);
//   formData.append("content1", content1);
//   formData.append("image2", image2);
//   formData.append("content2", content2);

//   try {
//     let response = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       Swal.fire({
//         title: "Success!",
//         text: "Blog post successfully added!",
//         icon: "success",
//       }).then(() => {
//         document.getElementById("blogForm").reset();
//         fetchBlogs();
//       });
//     } else {
//       Swal.fire({
//         title: "Failed!",
//         text: "Failed to add blog post.",
//         icon: "error",
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "An error occurred. Please try again!",
//       icon: "error",
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", fetchBlogs);

// async function fetchBlogs() {
//   try {
//     const response = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs");
//     const blogs = await response.json();
//     displayBlogs(blogs);
//   } catch (error) {
//     console.error("Error loading blogs:", error);
//   }
// }

// function displayBlogs(blogs) {
//   const blogContainer = document.getElementById("blog-container");
//   blogContainer.innerHTML = "";

//   blogs.forEach((blog, index) => {
//     if (index % 3 === 0) {
//       const newRow = document.createElement("div");
//       newRow.className = "row mb-4";
//       blogContainer.appendChild(newRow);
//     }

//     const row = blogContainer.lastElementChild;
//     const col = document.createElement("div");
//     col.className = "col-md-4 mb-4";

//     col.innerHTML = `
//       <div class="card h-100" style="border: none; transition: transform 0.3s;">
//         <a href="/blog-details?id=${blog._id}" class="text-decoration-none text-dark">
//           <div style="height: 200px; overflow: hidden;">
//             <img src="https://admin-backend-wbbc.onrender.com/${blog.image1}"
//                  class="img-fluid w-100 h-100"
//                  style="object-fit: cover;"
//                  alt="${blog.title}">
//           </div>
//           <div class="card-body p-3" style="height: 200px; overflow: hidden;">
//             <h6 class="card-title">${blog.title}</h6>
//             <small class="text-muted d-block mb-2">
//               By ${blog.author} | ${new Date(blog.createdAt).toLocaleDateString()}
//             </small>
//             <p class="card-text" style="font-size: 0.9rem; overflow: hidden; text-align: justify;">
//               ${blog.content1.substring(0, 200)}...
//             </p>
//           </div>
//         </a>
//         <div class="card-footer bg-transparent border-top-0">
//           <button class="main-btn primary-btn btn-hover" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editModal('${blog._id}')">Edit</button>
//           <button class="main-btn danger-btn btn-hover" onclick="deleteBlog('${blog._id}')">Delete</button>
//         </div>
//       </div>`;

//     row.appendChild(col);
//   });
// }

// const searchButton = document.getElementById("searchBlog");
// searchButton.addEventListener("click", searchBlog);
// document.addEventListener("keydown", (e) => {
//   if (e.code === "Enter") {
//     searchBlog();
//   }
// });

// async function searchBlog() {
//   try {
//     const searchBlogInput = document.getElementById("searchBlogInput");
//     const inputValue = searchBlogInput.value.trim().toLowerCase();
//     const blogContainer = document.getElementById("blog-container");

//     if (inputValue === "") {
//       Swal.fire({
//         title: "Input Required!",
//         text: "Please enter a title to search.",
//         icon: "warning",
//       });
//       return;
//     }

//     const response = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs");
//     const allBlogs = await response.json();

//     const matchedBlogs = allBlogs.filter((blog) =>
//       blog.title.toLowerCase().includes(inputValue)
//     );

//     blogContainer.innerHTML = "";

//     if (matchedBlogs.length === 0) {
//       blogContainer.innerHTML = "<p class='text-[var(--white)] text-center'>No blog found with that title.</p>";
//       return;
//     }

//     displayBlogs(matchedBlogs);
//   } catch (error) {
//     console.error("Error searching blog:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "Failed to search blogs.",
//       icon: "error",
//     });
//   }
// }

// async function editModal(blogId) {
//   try {
//     const response = await fetch(`https://admin-backend-wbbc.onrender.com/api/blogs/${blogId}`);
//     const blog = await response.json();

//     document.getElementById("editBlogId").value = blog._id;
//     document.getElementById("editTitle").value = blog.title;
//     document.getElementById("editMetaDescription").value = blog.metaDescription;
//     document.getElementById("editAuthor").value = blog.author;
//     document.getElementById("editContent1").innerHTML = blog.content1;
//     document.getElementById("editContent2").innerHTML = blog.content2;
//   } catch (error) {
//     console.error("Error fetching blog:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "Failed to load blog data.",
//       icon: "error",
//     });
//   }
// }

// async function updateBlog() {
//   event.preventDefault();

//   const blogId = document.getElementById("editBlogId").value;
//   const title = document.getElementById("editTitle").value;
//   const metaDescription = document.getElementById("editMetaDescription").value;
//   const author = document.getElementById("editAuthor").value;
//   const image1 = document.getElementById("editImage1").files[0];
//   const content1 = document.getElementById("editContent1").value;
//   const image2 = document.getElementById("editImage2").files[0];
//   const content2 = document.getElementById("editContent2").value;

//   let formData = new FormData();
//   formData.append("title", title);
//   formData.append("metaDescription", metaDescription);
//   formData.append("author", author);
//   if (image1) formData.append("image1", image1);
//   formData.append("content1", content1);
//   if (image2) formData.append("image2", image2);
//   formData.append("content2", content2);

//   try {
//     const response = await fetch(`https://admin-backend-wbbc.onrender.com/api/blogs/${blogId}`, {
//       method: "PUT",
//       body: formData,
//     });

//     if (response.ok) {
//       Swal.fire({
//         title: "Success!",
//         text: "Blog post successfully updated!",
//         icon: "success",
//       }).then(() => {
//         document.getElementById("editBlogForm").reset();
//         document.getElementById("editImage1Preview").style.display = "none";
//         document.getElementById("editImage2Preview").style.display = "none";
//         const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
//         modal.hide();
//         fetchBlogs();
        
//       });
//     } else {
//       Swal.fire({
//         title: "Failed!",
//         text: "Failed to update blog post.",
//         icon: "error",
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "An error occurred. Please try again!",
//       icon: "error",
//     });
//   }
// }

// async function deleteBlog(blogId) {
//   const result = await Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   });

//   if (result.isConfirmed) {
//     try {
//       const response = await fetch(`https://admin-backend-wbbc.onrender.com/api/blogs/${blogId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         Swal.fire({
//           title: "Success!",
//           text: "Blog post successfully deleted!",
//           icon: "success",
//         }).then(() => {
//           fetchBlogs();
//         });
//       } else {
//         Swal.fire({
//           title: "Failed!",
//           text: "Failed to delete blog post.",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred. Please try again!",
//         icon: "error",
//       });
//     }
//   }
// }



async function uploadBlog() {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let metaDescription = document.getElementById("metaDescription").value;
  let author = document.getElementById("author").value;
  let image1 = document.getElementById("image1").files[0];
  let content1 = document.getElementById("content1").value;
  let image2 = document.getElementById("image2").files[0];
  let content2 = document.getElementById("content2").value;

  if (!image1 || !image2) {
    Swal.fire({
      title: "Missing Image!",
      text: "Please upload both images before submitting.",
      icon: "warning",
    });
    return;
  }

  let formData = new FormData();
  formData.append("title", title);
  formData.append("metaDescription", metaDescription);
  formData.append("author", author);
  formData.append("image1", image1);
  formData.append("content1", content1);
  formData.append("image2", image2);
  formData.append("content2", content2);

  try {
    let response = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Blog post successfully added!",
        icon: "success",
      }).then(() => {
        document.getElementById("blogForm").reset();
        fetchBlogs();
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Failed to add blog post.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error!",
      text: "An error occurred. Please try again!",
      icon: "error",
    });
  }
}

document.addEventListener("DOMContentLoaded", fetchBlogs);

async function fetchBlogs() {
  try {
    const response = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs");
    const blogs = await response.json();
    displayBlogs(blogs);
  } catch (error) {
    console.error("Error loading blogs:", error);
  }
}

function displayBlogs(blogs) {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";

  // Placeholder image URL (replace with your preferred placeholder)
  const placeholderImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  blogs.forEach((blog, index) => {
    if (index % 3 === 0) {
      const newRow = document.createElement("div");
      newRow.className = "row mb-4";
      blogContainer.appendChild(newRow);
    }

    const row = blogContainer.lastElementChild;
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    // Use blog.image1 directly, fallback to placeholder if null
    const imageSrc = blog.image1 || placeholderImage;

    col.innerHTML = `
      <div class="card h-100" style="border: none; transition: transform 0.3s;">
        <a href="/Blogs/blogdetail.html?id=${blog._id}" class="text-decoration-none text-dark">
          <div style="height: 200px; overflow: hidden;">
            <img src="${imageSrc}"
                 class="img-fluid w-100 h-100"
                 style="object-fit: cover;"
                 alt="${blog.title}"
                 onerror="this.src='${placeholderImage}'">
          </div>
          <div class="card-body p-3" style="height: 200px; overflow: hidden;">
            <h6 class="card-title">${blog.title}</h6>
            <small class="text-muted d-block mb-2">
              By ${blog.author} | ${new Date(blog.createdAt).toLocaleDateString()}
            </small>
            <p class="card-text" style="font-size: 0.9rem; overflow: hidden; text-align: justify;">
              ${blog.content1.substring(0, 200)}...
            </p>
          </div>
        </a>
        <div class="card-footer bg-transparent border-top-0">
          <button class="main-btn primary-btn btn-hover" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editModal('${blog._id}')">Edit</button>
          <button class="main-btn danger-btn btn-hover" onclick="deleteBlog('${blog._id}')">Delete</button>
        </div>
      </div>`;

    row.appendChild(col);
  });
}

const searchButton = document.getElementById("searchBlog");
// searchButton.addEventListener("click", searchBlog);
// document.addEventListener("keydown", (e) => {
//   if (e.code === "Enter") {
//     searchBlog();
//   }
// });

async function searchBlog() {
  try {
    const searchBlogInput = document.getElementById("searchBlogInput");
    const inputValue = searchBlogInput.value.trim().toLowerCase();
    const blogContainer = document.getElementById("blog-container");

    if (inputValue === "") {
      Swal.fire({
        title: "Input Required!",
        text: "Please enter a title to search.",
        icon: "warning",
      });
      return;
    }

    const response = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs");
    const allBlogs = await response.json();

    const matchedBlogs = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(inputValue)
    );

    blogContainer.innerHTML = "";

    if (matchedBlogs.length === 0) {
      blogContainer.innerHTML = "<p class='text-[var(--white)] text-center'>No blog found with that title.</p>";
      return;
    }

    displayBlogs(matchedBlogs);
  } catch (error) {
    console.error("Error searching blog:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to search blogs.",
      icon: "error",
    });
  }
}

async function editModal(blogId) {
  try {
    const response = await fetch(`https://admin-backend-wbbc.onrender.com/api/blogs/${blogId}`);
    const blog = await response.json();

    document.getElementById("editBlogId").value = blog._id;
    document.getElementById("editTitle").value = blog.title;
    document.getElementById("editMetaDescription").value = blog.metaDescription;
    document.getElementById("editAuthor").value = blog.author;
    document.getElementById("editContent1").innerHTML = blog.content1;
    document.getElementById("editContent2").innerHTML = blog.content2;
  } catch (error) {
    console.error("Error fetching blog:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to load blog data.",
      icon: "error",
    });
  }
}

async function updateBlog() {
  event.preventDefault();

  const blogId = document.getElementById("editBlogId").value;
  const title = document.getElementById("editTitle").value;
  const metaDescription = document.getElementById("editMetaDescription").value;
  const author = document.getElementById("editAuthor").value;
  const image1 = document.getElementById("editImage1").files[0];
  const content1 = document.getElementById("editContent1").value;
  const image2 = document.getElementById("editImage2").files[0];
  const content2 = document.getElementById("editContent2").value;

  let formData = new FormData();
  formData.append("title", title);
  formData.append("metaDescription", metaDescription);
  formData.append("author", author);
  if (image1) formData.append("image1", image1);
  formData.append("content1", content1);
  if (image2) formData.append("image2", image2);
  formData.append("content2", content2);

  try {
    const response = await fetch(`https://admin-backend-wbbc.onrender.com/api/blogs/${blogId}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Blog post successfully updated!",
        icon: "success",
      }).then(() => {
        document.getElementById("editBlogForm").reset();
        document.getElementById("editImage1Preview").style.display = "none";
        document.getElementById("editImage2Preview").style.display = "none";
        const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
        modal.hide();
        fetchBlogs();
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Failed to update blog post.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error!",
      text: "An error occurred. Please try again!",
      icon: "error",
    });
  }
}

async function deleteBlog(blogId) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`https://admin-backend-wbbc.onrender.com/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Blog post successfully deleted!",
          icon: "success",
        }).then(() => {
          fetchBlogs();
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Failed to delete blog post.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again!",
        icon: "error",
      });
    }
  }
}