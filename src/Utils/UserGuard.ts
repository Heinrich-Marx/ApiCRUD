import { IUser } from "../TypesAndInterfaces/Interfaces";

const isUser = (obj:any) => {
  return   ("username" in obj &&  typeof obj.username === "string")
  && ("age" in obj && typeof obj.age === "number")
  && ("hobbies" in obj && Array.isArray(obj.hobbies))
  && (obj.hobbies.length > 0 ? typeof obj.hobbies[0] === "string" : true)
}


export {isUser}