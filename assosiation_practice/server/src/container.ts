import { AuthController } from "./modules/auth/authController";
import { AuthService } from "./modules/auth/authService";
import { UserRepository } from "./modules/user/userRepository";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export { authController };