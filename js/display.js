const button = document.querySelector(".btn");
const main = document.querySelector(".main");

const getdata = (associate) => {
  fetch(`/gm?id=${associate}`)
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      main.innerHTML = " ";
      if (products.length > 0) {
        const html = `
          <h2 class="h2">Business Associates</h2>
          <table class="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>ID</th>
                <!-- <th>Layout Name</th>
                <th>Plots Sold</th>
                <th>Mobile</th> -->
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="employeeTableBody">
              ${products
                .map((associate, index) => {
                  return `
                    <tr>
                      <td>
                        <div class="employee-cell">
                          <img src="${associate.image}" />
                          <span>${associate.firstname} ${associate.lastname}</span>
                        </div>
                      </td>
                      <td>${associate.employeeid}</td>
                      <td>${associate.age}</td>
                      <td>${associate.gender}</td>
                      <td>
                        <a href="/bussiness-associate?id=${associate._id}" class="view-profile-link">
                          View Profile
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  `;
                })
                .join("")}
            </tbody>
          </table>
        `;
        main.insertAdjacentHTML("beforeend", html);
      } else {
        main.innerHTML = "No associates found";
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      main.innerHTML = "Error fetching data";
    });
};

button.addEventListener("click", () => {
  const associate = document.querySelector(".empid").value;
  console.log("Associate:", associate);
  getdata(associate);
});
// button.addEventListener("click", () => {
//   const associates = Array.from(
//     document.querySelectorAll(".associate") // Select all inputs with class 'associate'
//   ).map((input) => input.value); // Map to get their values

//   console.log("Associates:", associates); // Log the associates array
//   getdata(associates); // Call the function with the associates array
// });
// Modal functionality
// Modal functionality
function openModal(imageUrl) {
  const modal = document.getElementById("documentModal");
  const modalImg = document.getElementById("modalImage");

  if (!modal || !modalImg) {
    console.error("Modal elements not found");
    return;
  }

  modalImg.src = imageUrl;
  modal.style.display = "block";

  // Prevent body scrolling when modal is open
  document.body.style.overflow = "hidden";
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("documentModal");
  const closeButton = document.querySelector(".close-modal");
  const documentCards = document.querySelectorAll(".document-card");

  // Add click handlers to all document cards
  documentCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const imageUrl = card.querySelector(".document-preview img").src;
      openModal(imageUrl);
    });
  });

  if (closeButton) {
    // Close modal when clicking the close button
    closeButton.addEventListener("click", () => {
      if (!modal) return;
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  if (modal) {
    // Close modal when clicking outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
// const getdata = (associates) => {
//   const fetchPromises = associates.map((associate) => {
//     return fetch(`/gm?id=${associate}`)
//       .then((response) => response.json())
//       .then((data) => data.products);
//   });

//   Promise.all(fetchPromises).then((results) => {
//     const products = results.flat();
//     main.innerHTML = " ";
//     if (products.length > 0) {
//       const html = `
//     <h2 class="h2">Business Associates</h2><table class="employee-table">
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>ID</th>
//               <!-- <th>Layout Name</th>
//               <th>Plots Sold</th>
//               <th>Mobile</th> -->
//               <th>Age</th>
//               <th>Gender</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody id="employeeTableBody">
//         ${products
//           .map((associate, index) => {
//             return `

//             <tr>
//               <td>
//                 <div class="employee-cell">
//                   <img
//                     src="${associate.image}"

//                   />
//                   <span
//                     >${associate.firstname} ${associate.lastname}</span
//                   >
//                 </div>
//               </td>
//               <td>${associate.employeeid}</td>

//               <td>${associate.age}</td>
//               <td>${associate.gender}</td>
//               <td>
//                 <a
//                   href="/bussiness-associate?id=${associate._id}"
//                   class="view-profile-link"
//                 >
//                   View Profile
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     stroke-width="2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   >
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </a>
//               </td>
//             </tr>

//             `;
//           })
//           .join("")}
//           </tbody>
//         </table>

//   `;
//       main.insertAdjacentHTML("beforeend", html);
//     } else {
//       main.innerHTML = "No associates found";
//     }
//   });
// };
