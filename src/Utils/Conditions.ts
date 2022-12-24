import { IncomingMessage } from "http";

const conditionForId = (req: IncomingMessage) => req.url && req.url.match(/\/api\/users\/*/)

export {conditionForId}