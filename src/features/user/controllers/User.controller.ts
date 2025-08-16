import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/User.service";

export class UserController {
  constructor(private readonly userService: UserService) {}
}
