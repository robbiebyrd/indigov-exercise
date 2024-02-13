import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConstituentController} from './constituent.controller';
import {Constituent} from './constituent.entity';
import {ConstituentService} from './constituent.service';

@Module({
    imports: [TypeOrmModule.forFeature([Constituent])],
    controllers: [ConstituentController],
    providers: [ConstituentService],
})
export class ConstituentModule {
}
