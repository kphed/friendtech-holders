const fs = require('fs');
const axios = require('axios');

// @frenlend FT account (originally was a contribution to them).
const FRIENDTECH_ACCOUNT = '0x803d51a34382b8cbd00404008c636a61afd09504';

const getEndpoint = (address, pageStart) =>
  `https://prod-api.kosetto.com/users/${address}/token/holders?pageStart=${pageStart}`;

const getUsers = async (address, pageStart = 0, users = []) => {
  const { data } = await axios.get(getEndpoint(address, pageStart));

  if (data.nextPageStart === null) return [...data.users, ...users];

  return getUsers(address, data.nextPageStart, [...data.users, ...users]);
};

getUsers(FRIENDTECH_ACCOUNT, 0, []).then((users) =>
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users))
);
