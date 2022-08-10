const ODMB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const ODMB_BASE_URL = process.env.REACT_APP_OMDB_BASE_URL;

console.log("apikey", ODMB_API_KEY, ODMB_BASE_URL);

const api = {
  url: ODMB_BASE_URL,
  key: ODMB_API_KEY,
};

export const authUsers = [
  {
    id: "1001",
    username: "admin",
    name: "Admin",
    pass: "1234",
  },
  {
    id: "1002",
    username: "bruno",
    name: "Bruno Díaz",
    pass: "1234",
  },
  {
    id: "1003",
    username: "linder",
    name: "Linder Hassinger",
    pass: "1234",
  },
  {
    id: "1004",
    username: "andres",
    name: "Andres Taboada",
    pass: "1234",
  },
];

const Config = {
  authUsers,
  api,
};

export default Config;
