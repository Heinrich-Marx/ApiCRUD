import {createServer} from "http"
import * as dotenv from "dotenv"
import * as process from "process";
import { usersEndpoint } from "./Endpoint/UsersEndpoint";
import { regexForUuid } from "./Utils/RegexForUuid";
import { createCorrectBody } from "./Utils/CreateCorrectBody";
import {getAllUsers, getUserById} from "./Endpoint/GET"
import { isUser } from "./Utils/UserGuard";
import { createUser } from "./Endpoint/POST";
import { updateUser } from "./Endpoint/PUT";
import { conditionForId } from "./Utils/Conditions";
import { deleteUserById } from "./Endpoint/DELETE";

dotenv.config()

const PORT = +(process.env.PORT || 8000)

const server = createServer((req, res) => {

  if (req.url === "/api/users" && req.method === "GET") {
    return getAllUsers(res)
  }

  if (req.url === "/api/users" && req.method === "POST") {
   return  createUser(res, req)
  }

  if (conditionForId(req) && req.method === "GET") {
   return  getUserById(res,req)
  }

  if (conditionForId(req) && req.method === "PUT") {
    updateUser(res, req)
  }

  if (conditionForId(req) && req.method === "DELETE") {
    deleteUserById(res,req)
  }
})

server.listen(PORT, () => console.log("Server is working"))