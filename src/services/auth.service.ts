import { compare, compareSync, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { AuthenticateUserDto, CreateUserDto } from '@dtos/users.dto';
import { GlobalHttpException } from '@/exceptions/GlobalHttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@models/user';

import finalConfig = require('../config/sequelize-cli')

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, finalConfig.secret, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
@Service()
export class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await User.findOne({ where: { login: userData.login } });
    if (findUser) throw new GlobalHttpException(409, `This login ${userData.login} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await User.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: AuthenticateUserDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await User.findOne({ where: { login: userData.login } });
    if (!findUser) throw new GlobalHttpException(409, `This login ${userData.login} was not found`);

    //const hashedPassword = await hash(userData.password, 10);
    //console.log(userData.password, findUser.password, hashedPassword);
    const isPasswordMatching: boolean = compareSync(userData.password, findUser.password);
    if (!isPasswordMatching) throw new GlobalHttpException(409, 'Password not matching');
    const retVal = await findUser.update('updatedAt', new Date());
    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await User.findOne({ where: { login: userData.login, password: userData.password } });
    if (!findUser) throw new GlobalHttpException(409, "User doesn't exist");

    return findUser;
  }
}
