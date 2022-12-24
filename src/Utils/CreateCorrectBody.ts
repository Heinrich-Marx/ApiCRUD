import { IUser } from "../TypesAndInterfaces/Interfaces"
import { v4 as uuidv4 } from 'uuid';

const createCorrectBody = (str:string):IUser => {
  return  Object.assign(JSON.parse(str), {id:uuidv4()})
}

export {createCorrectBody}