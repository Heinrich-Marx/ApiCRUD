import { IUser } from "../TypesAndInterfaces/Interfaces"

class UsersEndpoint {

     allUsers:IUser[] = []

    findAllUsers() {
     return this.allUsers
    }

    findUserById(userId:string) {
      return this.allUsers.find(({id}) => id === userId)
    }

    createNewUser(newUser:IUser) {
      this.allUsers.push(newUser)
    }

    changeUser(id:string, newUser:IUser) {
      this.allUsers = this.allUsers.reduce<IUser[]>((acc,user) => {
         if (user.id === id) {
           return [
             ...acc,
             newUser
           ]
         }
         return [
           ...acc,
           user
         ]
       }, [])
    }

    deleteUserById(userId:string) {
       this.allUsers = this.allUsers.filter(({id}) => id !== userId)
    }

}

const usersEndpoint = new UsersEndpoint()

export {usersEndpoint}