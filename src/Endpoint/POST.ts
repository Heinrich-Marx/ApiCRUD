import { IncomingMessage, ServerResponse } from "http"
import { createCorrectBody } from "../Utils/CreateCorrectBody"
import { isUser } from "../Utils/UserGuard"
import { usersEndpoint } from "./UsersEndpoint"

const createUser = (res: ServerResponse<IncomingMessage>, req: IncomingMessage) => {

  req.setEncoding('utf-8')
  let body = ""
  req.on("data", (chunk) => {
    body += chunk
  })

  req.on("end" ,() => {
    const newUser = createCorrectBody(body)
    if (isUser(newUser)) {
      usersEndpoint.createNewUser(newUser)

      res.writeHead(201)

      return res.end(JSON.stringify(newUser))
    }

    res.writeHead(400)

    return res.end(JSON.stringify("body doesn't contain required fields"))

  })
}

export {createUser}