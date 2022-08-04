import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { usersDB } from "../persistence/index.js";

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

export const loginStrategy = new Strategy(async (username, password, done) => {
  let user = await usersDB.getById(username);
  if (user === false) {
    console.log("El usuario no existe");
    return done(null, false);
  } else if (!isValidPassword(user, password)) {
    console.log("Contraseña incorrecta");
    return done(null, false);
  } else {
    return done(null, user);
  }
});

export const registationStrategy = new Strategy(
  {
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    let user = await usersDB.getById(username);
    if (user !== false) {
      console.log(`El usuario ${username} ya se encuentra registrado`);
      return done(null, false);
    }
    const newUser = {
      id: username,
      password: createHash(password),
    };
    await usersDB.write(newUser)
    return done(null, newUser);
  }
);

export const serialize = (user, done) => {
  done(null, user.username);
};

export const deserialize = async (username, done) => {
  let user = await usersDB.getById(username);
  return done(null, user);
};
