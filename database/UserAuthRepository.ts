import { PrismaClient } from "@prisma/client";

interface IUserAuthRepository {
    getAuth(address: string): Promise<string | null>;
    setAuth(address: string): Promise<string | null>;
}

export default class UserAuthRepository implements IUserAuthRepository {
    private database: PrismaClient;
    
    constructor() {
        this.database = new PrismaClient();
    }
    
    public async getAuth(address: string): Promise<string | null> {
        var userAuth = await this.database.userAuth.findUnique({
            where: {
                address: address
            }
        });
        return userAuth?.challenge ?? null;
    }

    public async setAuth(address: string): Promise<string | null> {
        const challenge = Math.random().toString(36).substring(2, 15);
        var existingUserAuth = await this.database.userAuth.findUnique({
            where: {
                address: address
            }
        });
        if(existingUserAuth === null) {
            await this.database.userAuth.create({
                data: {
                    address: address,
                    challenge: challenge
                }
            });
        }
        else {
            await this.database.userAuth.update({
                where: {
                    address: address
                },
                data: {
                    challenge: challenge
                }
            });
        }
        return challenge;
    }
}