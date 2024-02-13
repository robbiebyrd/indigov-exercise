import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    index(): string {
        return 'Welcome to the constituent service!';
    }
}
