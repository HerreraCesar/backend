const Container = require('./index')

const products = new Container('./productos.txt')

const main = async () => {

    products.write('[]');
    console.log(await products.getAll()); 
    await products.save(
        {
            title: 'Escuadra',
            price: 123.45,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        }
    );
    await products.save(
        {
            title: 'Calculadora',
            price: 234.56,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        }
    );
    
    console.log(await products.getAll());
    console.log(await products.getById(2));
    await products.deleteById(2);
    console.log(await products.getAll());
    await products.save(
        {
            title: 'Globo Terráqueo',
            price: 345.67,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                                                                            
        }
    );
    console.log(await products.getAll());
    await products.deleteAll();
    console.log(await products.getAll());
    
}

main()
