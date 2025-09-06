import { Account, Client, Users } from "node-appwrite";
import { env } from "./env";

const client = new Client()
  .setEndpoint(env.APPWRITE_ENDPOINT)
  .setProject(env.APPWRITE_PROJECT_ID)
  .setKey(env.APPWRITE_API_KEY);

// Create a function to get an authenticated client
export const getAuthenticatedClient = (jwt: string) => {
  return new Client()
    .setEndpoint(env.APPWRITE_ENDPOINT)
    .setProject(env.APPWRITE_PROJECT_ID)
    .setJWT(jwt);
};

const account = new Account(client);
const users = new Users(client);

export { client, account, users };
