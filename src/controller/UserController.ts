import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
  private userRepository = getRepository(User);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(req.params.id);
  }

  async save(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.save(req.body);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const targetUser = new User();
    targetUser.firstName = req.body.firstName;
    targetUser.lastName = req.body.lastName;
    targetUser.age = req.body.age;

    await this.userRepository.update(req.params.id, targetUser);
    const updatedUser = await this.userRepository.findOne(req.params.id);
    res.send(updatedUser);
  }

  async remove(req: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(req.params.id);
    await this.userRepository.remove(userToRemove);
    response.send(`User id ${req.params.id} has been deleted.`);
  }
}
