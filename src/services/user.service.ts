import { User } from '../models/User'
import { AppDataSource } from '../data-source'

export class UserService {
  private _userRepository = AppDataSource.getRepository(User)

  async saveUser(
    firstName: string,
    lastName: string,
    age: number
  ): Promise<number> {
    try {
      const user = new User()
      user.firstName = firstName
      user.lastName = lastName
      user.age = age
      this._userRepository.save(user)
      return 200
    } catch {
      console.log('ERR: ~ 🦋🦋🦋 line 20 saveUser.js')
      return 1
    }
  }
}
