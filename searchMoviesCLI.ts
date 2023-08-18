import { Client } from "pg";

const readlineSync = require("readline-sync");

//As your database is on your local machine, with default port,
//and default username and password,
//we only need to specify the (non-default) database name
async function searchMovie(searchTerm: string) {
  const client = new Client({ database: "omdb" });
  await client.connect();

  const dbQuery = "select * from casts_view where movie_name like $1";
  const searchValue = [`%${searchTerm}%`];

  try {
    const result = await client.query(dbQuery, searchValue);
    console.log(result.rows);
    console.log("no error occurred, results are above.");
  } catch (e) {
    console.error(e.stack);
  } finally {
    console.log("closing connection, whether or not an error occurred.");
    client.end();
  }
  console.log("continuing normally");
}

console.log("Welcome to search-movies-cli!");

const userName = readlineSync.question("May I have your name? ");
console.log(`Hi ${userName}`);

function getUserInput() {
  return readlineSync.question("Enter a search string (or 'q' to quit): ");
}

while (true) {
  const searchInput = getUserInput();
  if (searchInput.toLowerCase() === "q") {
    console.log("Quitting...");
    break;
  }

  searchMovie(searchInput.toLowerCase());
  console.log("You entered:", searchInput);
}
