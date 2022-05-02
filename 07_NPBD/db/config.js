import pkg from 'knex';

const { knex } = pkg;

export const MySQL = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "ecommerce",
  },
});

export const SQLite = knex({
  client: "sqlite",
  connection: {
    filename: "./mydb.sqlite",
  },
  useNullAsDefault: true,
});
