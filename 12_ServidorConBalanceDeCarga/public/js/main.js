const time = new Date().valueOf();
let socket = io.connect();

const messagesContainer = document.getElementById("messages");
const productsContainer = document.getElementById("products");
const productsForm = document.getElementById("newProduct");
const messagesForm = document.getElementById("newMessage");
const compressionLevel = document.getElementById("compression");
const user = document.getElementById("user");
const logoutButton = document.getElementById("logout");
const changeSection = document.querySelector("#changeSection");
const back = document.querySelector("#back");

const author = new normalizr.schema.Entity(
  "author",
  {},
  { idAttribute: "email" }
);
const message = new normalizr.schema.Entity(
  "message",
  {
    author: author,
  },
  { idAttribute: "_id" }
);

const messagesArray = [message];

if (window.location.pathname === "/logout") {
  setTimeout(() => {
    location.href = "/login";
  }, 2000);
} else if (window.location.pathname === "/api/productos-test") {
  socket.on("products-test", function (products) {
    renderProducts(products);
  });
} else if (window.location.pathname === "/api") {
  socket.on("products", function (products) {
    renderProducts(products);
  });
  socket.on("messages", function (normalizedMessages, compression) {
    const messages = normalizr.denormalize(
      normalizedMessages.result,
      messagesArray,
      normalizedMessages.entities
    );
    renderMessages(messages);
    renderCompression(compression);
  });

  function renderCompression(compression) {
    compressionLevel.innerHTML = `Compresión: ${compression}%`;
  }

  function renderMessages(messages) {
    let html = "";
    if (messages.length === 0) {
      html = "<h4>No hay mensajes</h4>";
    }
    html = messages
      .map(function (e, index) {
        return `
          <div>
            <strong>${e.author.email}</strong>
            <span>[${new Date(e.timestamp).toLocaleString("es-AR")}]:</span>
            <em>${e.text}</em> 
          </div>`;
      })
      .join(" ");
    messagesContainer.innerHTML = html;
  }

  function renderProducts(products) {
    let html = products
      .map(function (e, index) {
        return `
          <tr>
            <th scope='row' class='align-middle'>${e.id}</th>
            <td class='align-middle'>${e.title}</td>
            <td class='align-middle'>${e.price}</td>
            <td class='align-middle'>
              <img src=${e.thumbnail} width="100" alt="" />
            </td>
          </tr>`;
      })
      .join(" ");
    productsContainer.innerHTML = html;
  }

  productsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
      title: document.getElementById("title").value,
      price: parseFloat(document.getElementById("price").value),
      thumbnail: document.getElementById("thumbnail").value,
      timestamp: time,
    };
    socket.emit("addProduct", product);
    productsForm.reset();
  });

  messagesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = {
      author: {
        email: document.getElementById("email").value,
        name: document.getElementById("name").value,
        lastname: document.getElementById("lastname").value,
        age: document.getElementById("age").value,
        alias: document.getElementById("alias").value,
        avatar: document.getElementById("avatar").value,
      },
      timestamp: time,
      text: document.getElementById("text").value,
    };
    socket.emit("addMessage", message);
    document.getElementById("text").value = "";
    document.getElementById("text").focus();
  });

  logoutButton.addEventListener("click", () => {
    location.href = "/logout";
  });
}

if (location.pathname === "/login") {
  changeSection.addEventListener("click", () => {
    location.href = "/registration";
  });
} else if (location.pathname === "/registration") {
  changeSection.addEventListener("click", () => {
    location.href = "/login";
  });
} else if (
  location.pathname === "/loginError" ||
  location.pathname === "/registrationError"
) {
  back.addEventListener("click", () => {
    history.go(-1);
  });
}
