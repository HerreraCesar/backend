import axios from "axios";

function getData() {
  return axios.get(`http://localhost:8080/api/products/1hq1njbosl3diwj1r`);
}

function postData() {
  return axios.post(`http://localhost:8080/api/products`, {
    title: "Pencil",
    price: 80.88,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-04-256.png",
  });
}

function putData() {
  return axios.put(`http://localhost:8080/api/products`, {
    id: "1hq1njbosl3diwj1r",
    data: {
      title: "Escuadra importada",
      price: 125,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    },
  });
}

function deleteData() {
  return axios.delete(`http://localhost:8080/api/products`, {
    data: {
      id: "1hq1njduol6f7sb63",
    },
  });
}

Promise.all([
  await getData(),
  /* await postData(), */
  /* await deleteData(), */
  /* await putData(), */
]).then(function (results) {
  console.log(results[0].data);
  /* console.log(results[1].data); */
  /* console.log(results[2].data); */
});
