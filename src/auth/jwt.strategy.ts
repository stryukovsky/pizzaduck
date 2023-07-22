import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

const JWT_SECRET = process.env.JWT_SECRET as string;

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private users: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        })
    }

    async validate(payload: {userId: number}): Promise<User> {
        const user = await this.users.findOne(payload.userId);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
