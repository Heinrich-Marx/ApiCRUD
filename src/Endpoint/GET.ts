import {IncomingMessage, ServerResponse } from "http";
import { regexForUuid } from "../Utils/RegexForUuid";
import { usersEndpoint } from "./UsersEndpoint";

const getAllUsers = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(200)

  return res.end(JSON.stringify(usersEndpoint.findAllUsers()))
}

const getUserById = (res: ServerResponse<IncomingMessage>, req: IncomingMessage) => {
  const id = req.url?.match(regexForUuid)
  if (!id) {
    res.writeHead(400)

    return res.end(JSON.stringify("User id is not valid"))
  }

  const currentUser = usersEndpoint.findUserById(id[0])

  if (!currentUser) {
    res.writeHead(404)

    return  res.end(JSON.stringify("User doesn't exist"))
  }

  res.writeHead(200)

  return res.end(JSON.stringify(currentUser))
}

export {getAllUsers, getUserById}