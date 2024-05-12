import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

const userRouter: Router = Router();
const user = new UserController();

/**
 * @swagger
 * definitions:
 *  authuser:
 *   type: object
 *   required:
 *     - login
 *     - password
 *   properties:
 *     login:
 *       type: string
 *       description: user login
 *     password:
 *       type: string
 *       description: user Password
 * 
 *  users:
 *   type: object
 *   required:
 *       - login
 *       - password
 *       - email
 *       - name
 *   properties:
 *     login:
 *       type: string
 *       description: user login
 *     password:
 *       type: string
 *       description: user Password
 *     email:
 *       type: string
 *       description: user email
 *     name:
 *       type: string
 *       description: user name
 */


/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Users manipulation
 *   - name: authentication
 *     description: Authentication the user
 */
/**
 * @swagger
 * /users:
 *    get:
 *      tags: 
 *        - users
 *      description: Get all users
 *      produces:
 *       - application/json
 *      responses:
 *       200:
 *         description: users
 *         schema:
 *           type: object
 *           $ref: '#/definitions/users'
 *
 *  
 */
userRouter.get('/', AuthMiddleware, user.getUsers);
/**
 * @swagger
 * /users/id:
 *    get:
 *      tags: 
 *        - users
 *      description: Get one User
 *      produces:
 *       - application/json
 *      properties:
 *        - name: id
 *          in: formData
 *          required: true
 *      responses:
 *       200:
 *         description: users
 *         schema:
 *           type: object
 *           $ref: '#/definitions/users'
 */
userRouter.get('/:id', user.getUserById);
/**
 * @swagger
 * /users/id:
 *    post:
 *      tags: 
 *        - users
 *      description: Create a new User
 *      produces:
 *       - application/json
 */
userRouter.post('/', ValidationMiddleware(CreateUserDto), user.createUser);
/**
 * @swagger
 * /users/id:
 *    put:
 *      tags: 
 *        - users
 *      description: Update one User
 *      produces:
 *       - application/json
 */
userRouter.put('/:id', ValidationMiddleware(CreateUserDto, true), user.updateUser);
/**
 * @swagger
 * /users/id:
 *    delete:
 *      tags: 
 *        - users
 *      description: Delete an existing User
 *      produces:
 *       - application/json
 */
userRouter.delete('/:id', user.deleteUser);

export default userRouter
