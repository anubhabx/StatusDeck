import { Account, Client, Users } from "node-appwrite";
import { env } from "./env";

const client = new Client()
  .setEndpoint(env.APPWRITE_ENDPOINT)
  .setProject(env.APPWRITE_PROJECT_ID)
  .setKey(env.APPWRITE_API_KEY);

const account = new Account(client);

const users = new Users(client);

export { client, account, users };
