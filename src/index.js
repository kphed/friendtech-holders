const fs = require('fs');
const axios = require('axios');

// FT account to get users/keyholders for.
const FRIENDTECH_ACCOUNT = '0x803d51a34382b8cbd00404008c636a61afd09504';

// Path to write users file to.
const USERS_FILE_PATH = `${__dirname}/users.json`;

const getUsers = async (pageStart = 0, users = []) => {
  try {
    const { data } = await axios.get(
      `https://prod-api.kosetto.com/users/${FRIENDTECH_ACCOUNT}/token/holders?pageStart=${pageStart}`
    );
    const newUsers = [...data.users, ...users];

    if (data.nextPageStart === null) return newUsers;

    return getUsers(data.nextPageStart, newUsers);
  } catch (err) {
    throw err;
  }
};

getUsers()
  .then((users) => fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users)))
  .catch((err) => console.error(err));
