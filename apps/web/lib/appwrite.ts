import { Client, Account } from "appwrite";

import { env } from "./env";

const client = new Client()
  .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export { client, account };
