import axios from "axios";

function getData() {
  return axios.get(`http://localhost:8080/api/products`)
}

function postLogin() {
  return axios.post(`http://localhost:8080/login`,{
    username: "César",
    password: "123456"
  })
}

/* function postData() {
  return axios
    .post(post, {
      title: "Pencil",
      price: 50.88,
      thumbnail:
        "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-04-256.png",
    })
}

function putData() {
    return axios.put(put, {
        price: 1.01
    })
}

function deleteData() {
    return axios.delete(del)
}
 */
Promise.all([await postLogin(), await getData()/* , await postData(), await putData(), await deleteData(), await getData() */])
.then(function (results) {
    console.log(results[0].data);
    console.log(results[1].data);
    /* console.log(results[1].data);
    console.log(results[2].data);
    console.log(results[3].data);
    console.log(results[4].data); */
})