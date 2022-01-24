import { PrismaClient, User } from "@prisma/client";

interface IUserRepository {
    getUser(address: string): Promise<User | null>;
    createUser(address: string, username: string) : Promise<User>;
    updateUser(address: string, username: string): Promise<User>;
}

export default class UserRepository implements IUserRepository {
    private database: PrismaClient;
    
    constructor() {
        this.database = new PrismaClient();
    }
    
    public async getUser(address: string): Promise<User | null> {
        var user = await this.database.user.findUnique({
            where: {
                address: address
            }
        });
        return user ?? null;
    }

    public async createUser(address: string, username: string) : Promise<User> {
        var user = await this.database.user.create({
            data: {
                address: address,
                username: username
            }
        });
        return user;
    }

    public async updateUser(address: string, username: string): Promise<User> {
        var user = await this.database.user.update({
            where: {
                address: address
            },
            data: {
                username: username
            }
        });
        return user;
    }
}