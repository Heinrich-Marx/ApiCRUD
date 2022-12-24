import {IncomingMessage, ServerResponse} from "http";
import { regexForUuid } from "../Utils/RegexForUuid";
import { usersEndpoint } from "./UsersEndpoint";

const deleteUserById = (res: ServerResponse<IncomingMessage>, req: IncomingMessage) => {
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

  usersEndpoint.deleteUserById(id[0])

  res.writeHead(204)

  return res.end("User has been deleted")
}

export {deleteUserById}