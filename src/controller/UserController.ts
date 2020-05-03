import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const targetUser = new User();
    targetUser.firstName = request.body.firstName;
    targetUser.lastName = request.body.lastName;
    targetUser.age = request.body.age;

    await this.userRepository.update(request.params.id, targetUser);
    const updatedUser = await this.userRepository.findOne(request.params.id);
    response.send(updatedUser);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
    response.send('User has been deleted.');
  }
}
