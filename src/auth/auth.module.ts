import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: {
                expiresIn: JWT_EXPIRATION
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}