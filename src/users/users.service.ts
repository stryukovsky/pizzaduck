import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { subtle } from "crypto";
import { webcrypto } from "crypto";



@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {
    }

    public async create(username: string, password: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                username,
                password
            }
        });
    }

    public async details(username: string): Promise<User> {
        return this.prisma.user.findUnique({where: {username}});
    }

    public async findOne(id: number): Promise<User> {
        return this.prisma.user.findUnique({where: {id}});
    }
}
