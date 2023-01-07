import { User } from '../models/User'
import { AppDataSource } from '../data-source'

export class UserService {
  private readonly _userRepository = AppDataSource.getRepository(User)

  async saveUser(
    firstName: string,
    lastName: string,
    age: number
  ): Promise<number> {
    try {
      console.log('Saving a new user into the database...')
      const user = new User()
      user.firstName = firstName
      user.lastName = lastName
      user.age = age
      this._userRepository.save(user)
      console.log('User inserted succesfully')
      return 200
    } catch {
      console.log('ERR: ~ 🦋🦋🦋 line 17 saveUser.js')
      return 1
    }
  }

  async hi() {
    console.log('HI MY NAME IS HI')
  }
}
