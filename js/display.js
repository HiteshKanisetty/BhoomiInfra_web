const button = document.querySelector(".btn");
const main = document.querySelector(".main");

const getdata = (associates) => {
  const fetchPromises = associates.map((associate) => {
    return fetch(`/gm?id=${associate}`)
      .then((response) => response.json())
      .then((data) => data.products);
  });

  Promise.all(fetchPromises).then((results) => {
    const products = results.flat();
    main.innerHTML = " ";
    if (products.length > 0) {
      const html = `
    <h2 class="h2">Business Associates</h2>
        ${products
          .map((associate, index) => {
            return `
                 
          <div>
           
                <div  class="associate-card">
                  <img
                    src=${associate.image}
                    class="associate-image"
                  />
                  <div class="associate-info">
                    <h3>${associate.firstname}</h3>
                    <p>${associate.gender}</p>
                  </div>
                </div>
             
              
       
          </div>
   
            `;
          })
          .join("")}
     
  `;
      main.insertAdjacentHTML("beforeend", html);
    } else {
      main.innerHTML = "No associates found";
    }
  });
};

button.addEventListener("click", () => {
  const associates = Array.from(
    document.querySelectorAll(".associate") // Select all inputs with class 'associate'
  ).map((input) => input.value); // Map to get their values

  console.log("Associates:", associates); // Log the associates array
  getdata(associates); // Call the function with the associates array
});
