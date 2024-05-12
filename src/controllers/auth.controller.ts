import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthenticateUserDto, CreateUserDto } from '@dtos/users.dto';
import { User } from '@models/user';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: AuthenticateUserDto = req.body;
      const { cookie, findUser } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, cookie: cookie,  message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { cookie, findUser } = await this.auth.refreshToken(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, cookie: cookie,  message: 'refresh' });
    } catch (error) {
      next(error);
    }
  }

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
