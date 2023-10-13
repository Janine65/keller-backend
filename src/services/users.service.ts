import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { GlobalHttpException } from '@/exceptions/GlobalHttpException';
import { user } from '@models/init-models';

@Service()
export class UserService {
  public async findAllUser(): Promise<user[]> {
    const allUser: user[] = await user.findAll();
    return allUser;
  }

  public async findUserById(userId: string): Promise<user> {
    const findUser: user = await user.findByPk(userId);
    if (!findUser) throw new GlobalHttpException(409, "user doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<user> {
    const findUser: user = await user.findOne({ where: { email: userData.email } });
    if (findUser) throw new GlobalHttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: user = await user.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<user> {
    const findUser: user = await user.findByPk(userId);
    if (!findUser) throw new GlobalHttpException(409, "user doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await user.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: user = await user.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: string): Promise<user> {
    const findUser: user = await user.findByPk(userId);
    if (!findUser) throw new GlobalHttpException(409, "user doesn't exist");

    await user.destroy({ where: { id: userId } });

    return findUser;
  }
}
