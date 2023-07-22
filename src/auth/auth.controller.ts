import { Body, Controller, Post } from "@nestjs/common";
import { LoginDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    public login(@Body() {username, password}: LoginDTO) {
        return this.authService.login(username, password);
    }

    @Post("signup")
    public signup(@Body() {username, password}: LoginDTO) {
        return this.authService.signup(username, password);
    }
}
