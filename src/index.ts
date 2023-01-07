import { AppDataSource } from './data-source'
import { User } from './models/User'
import { Photo } from './models/Photo'
import { TaskStatus, Task } from './models/Task'

AppDataSource.initialize()
  .then(async () => {
    // DEFATULE EXAMPLE

    console.log('Inserting a new user into the database...')
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log('Saved a new user with id: ' + user.id)

    console.log('Loading users from the database...')
    const users = await AppDataSource.manager.find(User)
    console.log('Loaded users: ', users)

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    )

    // DOCUENTATION EXAMPLE

    console.log('Inserting a new photo into the database...')
    const photo = new Photo()
    photo.name = 'Me and Bears'
    photo.description = 'I am near polar bears'
    photo.filename = 'photo-with-bears.jpg'
    photo.views = 1
    photo.isPublished = true

    await AppDataSource.manager.save(photo)
    console.log('Photo has been saved. Photo id is', photo.id)

    // CHALLENGE EXAMPLE

    console.log('Inserting a new task into the database...')
    const task = new Task()
    task.title = 'Boxer the working horse'
    task.description = 'Boxer work hard'
    task.status = TaskStatus.PENDING

    await AppDataSource.manager.save(task)
    console.log('Task has been saved. Task id is', task.id)
  })
  .catch((error) => console.log(error))
