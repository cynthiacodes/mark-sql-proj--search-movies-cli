import { question } from "readline-sync";
import { Client } from "pg";

const readlineSync = require("readline-sync");

const userName = readlineSync.question("May I have your name? ");
console.log(`Hi ${userName}`);

//As your database is on your local machine, with default port,
//and default username and password,
//we only need to specify the (non-default) database name.
const client = new Client({ database: "omdb" });

console.log("Welcome to search-movies-cli!");
