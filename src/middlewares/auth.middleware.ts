import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '@/config/sequelize-cli';
import { GlobalHttpException } from '@/exceptions/GlobalHttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/models/user';

const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id } = verify(Authorization, secret) as DataStoredInToken;
      const findUser = await User.findByPk(id);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new GlobalHttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new GlobalHttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new GlobalHttpException(401, 'Wrong authentication token'));
  }
};
