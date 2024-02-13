import {Injectable} from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'admin',
            password: 'admin',
            role: "admin"
        },
        {
            userId: 2,
            username: 'user',
            password: 'user',
            role: "user"
        },
    ];

    async findOne(username: string): Promise<User> {
        return this.users.find(user => user.username === username);
    }
}
