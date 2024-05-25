import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { AuthenticateUserDto, CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const authRouter: Router = Router();
const auth = new AuthController();

/**
 * @swagger
 * /signup:
 *    post:
 *      tags: 
 *        - authentication
 *      description: Signup a new User
 */
authRouter.post('/signup', ValidationMiddleware(CreateUserDto), auth.signUp);
/**
 * @swagger
 * /login:
 *    post:
 *      tags: 
 *        - authentication
 *      description: Login an existing User
 *      parameters:
 *       - $ref: '#/definitions/authuser'
 *      responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/users'
 */
authRouter.post('/login', ValidationMiddleware(AuthenticateUserDto), auth.logIn);
/**
 * @swagger
 * /refreshToken:
 *    post:
 *      tags: 
 *        - authentication
 *      description: refresh the Token
 *      parameters:
 *       - $ref: '#/definitions/users'
 *      responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/users'
 */
authRouter.post('/refreshToken', auth.refreshToken);
/**
 * @swagger
 * /logout:
 *    post:
 *      tags: 
 *        - authentication
 *      description: Logout
 */
authRouter.post('/logout', AuthMiddleware, auth.logOut);

export default authRouter