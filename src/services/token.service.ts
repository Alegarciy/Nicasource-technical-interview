import { Token } from '../models/Token'
import { AppDataSource } from '../data-source'

// DATATYPES
import { TokenRepository } from './../typings/Repository/TokenRepository.d'
import { Id } from '../typings/Data/Database'
import { User } from '../models/User'

export class TokenService implements TokenRepository<Token> {
  private readonly repository = AppDataSource.getRepository(Token)

  async create(data: Partial<Token>): Promise<Token> {
    const token = this.repository.create(data)
    await this.repository.save(token)
    return token
  }

  async get(id: Id): Promise<Token> {
    const token = await this.repository.findOneBy({ id: id })

    if (!token) {
      throw new Error('Task does not exists')
    }

    return token
  }

  async getByUser(user: User): Promise<Token> {
    const token = await this.repository.findOne({
      where: { user: user },
      relations: { user: true },
    })

    if (!token) {
      throw new Error('User with token does not exists')
    }

    return token
  }

  async getByUserId(userId: string): Promise<Token> {
    const token = await this.repository
      .createQueryBuilder('token')
      .where('userId = :id', { id: userId })
      .getOne()
    console.log('hola mundo')
    console.log(token)
    console.log('hola mundo')

    if (!token) {
      throw new Error('User with token does not exists')
    }

    return token
  }

  async userExists(user: User): Promise<Boolean> {
    const token = await this.repository.findOne({
      where: { user: user },
      relations: { user: true },
    })
    console.log('userExists')
    console.log(token)
    console.log('userExists')
    return token != null
  }

  async tokenExists(token: string): Promise<Boolean> {
    const tokenSelected = await this.repository.findOneBy({ token: token })
    return tokenSelected != null
  }

  async update(user: User, data: Partial<Token>): Promise<Token> {
    const updatedToken = await this.getByUser(user)
    await this.repository.update(updatedToken.id, data)
    return updatedToken
  }

  async remove(id: Id): Promise<Token> {
    const token = await this.get(id)
    await this.repository.delete(id)
    return token
  }
}
