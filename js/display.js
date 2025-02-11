const buttons = document.querySelectorAll(".btn");
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

    const html = `
      <table>
        <thead>
          <tr>
            <th>sno</th>
            <th>name</th>
            <th>roll number</th>
            <th>seattype</th>
            <th>view more</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map((product, index) => {
              return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${product.firstname.toUpperCase()}</td>
                  <td>${product.lastname.toUpperCase()}</td>
                  <td>${product.layoutname}</td>
                  <td>
                    <a href="/view-more?id=${product._id}">view more</a>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;
    main.insertAdjacentHTML("beforeend", html);
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const associates = Array.from(
      button.closest("tr").querySelectorAll(".associate")
    ).map((input) => input.value);
    console.log(associates);
    getdata(associates);
  });
});
