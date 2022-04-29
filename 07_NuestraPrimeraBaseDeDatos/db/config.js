import pkg from 'knex';

const { knex } = pkg;

export const knexProducts = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "",
    database: "ecommerce",
  },
});

export const knexMessages = knex({
  client: "sqlite",
  connection: {
    filename: "./mydb.sqlite",
  },
  useNullAsDefault: true,
});
