import {Module} from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthGuard} from "./auth/auth.guard";
import {AuthModule} from './auth/auth.module';
import {Constituent} from './constituent/constituent.entity';
import {ConstituentModule} from './constituent/constituent.module';
import {UsersModule} from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db/sql',
            synchronize: true,
            entities: [Constituent],
        }),
        ConstituentModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
})
export class AppModule {
}
