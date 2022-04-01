const products = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
  {
    title: "Lápiz",
    price: 50.78,
    thumbnail:
      "https://cdn0.iconfinder.com/data/icons/economico-a-business-icon-set/74/pencil-lapis-256.png",
    id: 4,
  },
  {
    title: "Cuaderno",
    price: 200.33,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-04-256.png",
    id: 5,
  },
];

export const getProducts = () => {
  return products;
};

export const getProductById = (id) => {
    const index = products.findIndex( product => product.id === id);
    if (index === -1) {
        return {error: 'Producto no encontrado'};
    }
    return products[index];
};

export const addProduct = (data) => {
  const newProduct = { ...data, id: products[products.length - 1].id + 1 };
  products.push(newProduct);
  return `El producto ${newProduct.title} fue agregado correctamente y se le ha asignado el id: ${newProduct.id}`;
};

export const updateProductById = (id, newData) => {
    const index = products.findIndex( product => product.id === id);
    if (index === -1) {
        return {error: 'Producto no encontrado'};
    }
    if (newData.title){products[index].title = newData.title};
    if (newData.price){products[index].price = newData.price};
    if (newData.thumbnail){products[index].thumbnail = newData.thumbnail};
    return products[index];
};

export const deleteProductById = (id) => {
    const index = products.findIndex( product => product.id === id);
    if (index === -1) {
        return {error: 'Producto no encontrado'};
    }
    const name = products[index].title
    products.splice(index, 1);
    return `El producto ${name} fue eliminado correctamente`;
};