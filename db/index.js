const  {Pool} = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "**********",
    database: "**********",
    password: "**********",
    port: 5432
});
module.exports = {
    query: (text, params) => pool.query(text, params),
};
