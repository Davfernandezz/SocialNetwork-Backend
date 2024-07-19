import postSeeder from "./postSeeder";
import userSeeder from "./userSeeder";

(async () => {
  console.log("Starting seeders...");
  await userSeeder();
  await postSeeder();
})();