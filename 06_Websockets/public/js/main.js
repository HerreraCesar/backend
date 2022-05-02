const time = new Date();

let socket = io.connect();

socket.on("messages", function (data) {
  render(data);
});

function render(data) {
  let html = data
    .map(function (elem, index) {
      return `<div>
                <strong>${elem.author}</strong>
                <span>[${time.toLocaleString("es-AR")}]:</span>
                <em>${elem.text}</em> 
              </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

function addMessage() {
  let mensaje = {
    author: document.getElementById("username").value,
    text: document.getElementById("text").value,
  };
  socket.emit("new-message", mensaje);

  document.getElementById("text").value = "";
  document.getElementById("text").focus();

  return false;
}

function addProduct() {
  let newProduct = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    id: products.length === 0 ? 1 : products[products.length - 1].id + 1,
  };

  socket.emit("new-product", newProduct);
}
