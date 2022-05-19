const time = new Date().valueOf();
let socket = io.connect();

const messagesContainer = document.getElementById("messages");
const productsContainer = document.getElementById("products");
const productsForm = document.getElementById("newProduct");
const messagesForm = document.getElementById("newMessage");

socket.on("messages", function (messages) {
  renderMessages(messages);
});

socket.on("products", function (products) {
  renderProducts(products);
});

function renderMessages(messages) {
  let html = "";
  if (messages.length === 0) {
    html = "<h4>No hay mensajes</h4>";
  }
  html = messages
    .map(function (e, index) {
      return `
        <div>
          <strong>${e.author}</strong>
          <span>[${new Date(e.timestamp).toLocaleString('es-AR')}]:</span>
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
            <img src=${e.thumbnail} width="60" alt="" />
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
    timestamp: time
  };
  socket.emit("addProduct", product);
  productsForm.reset();
});

messagesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = {
    author: document.getElementById("username").value,
    timestamp: time,
    text: document.getElementById("text").value,
  };
  socket.emit("addMessage", message);
  document.getElementById("text").value = "";
  document.getElementById("text").focus();
});
