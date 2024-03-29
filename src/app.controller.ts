import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AppService} from './app.service';

@ApiTags('default')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    index(): string {
        return this.appService.index();
    }
}
