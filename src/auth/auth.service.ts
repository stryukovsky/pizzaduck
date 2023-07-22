import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { subtle } from "crypto";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";


@Injectable()
export class AuthService {
    constructor(private users: UsersService, private prisma: PrismaService) {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }

    private encoder: TextEncoder;
    private decoder: TextDecoder;

    public async hash(data: string): Promise<string> {
        const hashed = await subtle.digest("SHA-512", this.encoder.encode(data));
        return this.decoder.decode(hashed);
    }

    public async login(username: string, password: string): Promise<User | null> {
        const user = await this.users.details(username);
        if (!user) {
            return null;
        }
        const passwordHashed = await this.hash(password);
        if (user.password === passwordHashed) {
            return user;
        } else {
            return null;
        }
    }

    public async signup(username: string, password: string): Promise<User | null> {
        const user = await this.users.details(username);
        if (user) {
            return null;
        }
        return this.users.create(username, await this.hash(password));
    }
}
