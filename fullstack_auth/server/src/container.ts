import { AuthController } from "./modules/auth/authController";
import { AuthService } from "./modules/auth/authService";
import { RoleRepository } from "./modules/role/roleRepository";
import { UserRepository } from "./modules/user/userRepository";

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const authService = new AuthService(userRepository,roleRepository);
const authController = new AuthController(authService);

export { authController };