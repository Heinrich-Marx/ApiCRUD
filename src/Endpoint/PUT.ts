import {IncomingMessage, ServerResponse} from "http";
import { createCorrectBody } from "../Utils/CreateCorrectBody";
import { regexForUuid } from "../Utils/RegexForUuid";
import { usersEndpoint } from "./UsersEndpoint";

const updateUser = (res: ServerResponse<IncomingMessage>, req: IncomingMessage) => {
  const id = req.url?.match(regexForUuid)

  req.setEncoding('utf-8')
  let body = ""
  if (!id) {
    res.writeHead(400)

    return res.end(JSON.stringify("User id is not valid"))
  }

  const userBeforeUpdating = usersEndpoint.findUserById(id[0])

  if (!userBeforeUpdating) {
    res.writeHead(404)

    return  res.end(JSON.stringify("User doesn't exist"))
  }

  req.on("data", (chunk) => {
    body += chunk
  })


  req.on("end" ,() => {
    const updatedFields = Object.assign(JSON.parse(body))

    const userAfterUpdating = Object.assign({},userBeforeUpdating, updatedFields)

      res.writeHead(200)

      usersEndpoint.changeUser(id[0],userAfterUpdating)

      return res.end(JSON.stringify(userAfterUpdating))
  })


}

export {updateUser}