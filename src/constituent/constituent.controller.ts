import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ApiConsumes, ApiBody} from "@nestjs/swagger";

import {FileInterceptor} from '@nestjs/platform-express';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiOkResponse} from "@nestjs/swagger/dist/decorators/api-response.decorator";
import {Express} from 'express';
import {SkipAuth} from '../auth/decorators/public.decorator';

import {Constituent} from './constituent.entity';

import {ConstituentService, convertCSVToConstituents} from './constituent.service';

import {CreateConstituentDto} from './dto/create.dto';
import {UpdateConstituentDto} from './dto/update.dto';

enum OutputFormats {
    json = "json",
    csv = "csv",
}

@ApiBearerAuth()
@ApiTags('constituents')
@Controller('constituents')
export class ConstituentController {
    constructor(private readonly constituentService: ConstituentService) {
    }

    @SkipAuth()
    @ApiOperation({summary: 'Get all constituent records.'})
    @ApiResponse({status: 200, description: 'A list of constituent records.'})
    @Get()
    @ApiQuery({name: 'format', enum: OutputFormats})
    getAll(@Query('format') format: string): Promise<Constituent[] | string> {
        return this.constituentService.getAll(format);
    }

    @Get(':email')
    @ApiOperation({summary: 'Get a single constituent record by email address'})
    @ApiOkResponse({description: 'A constituent record.'})
    getOne(@Param('email') email: string): Promise<Constituent> {
        return this.constituentService.getOne(email);
    }

    @SkipAuth()
    @ApiOperation({summary: 'Create a new constituent record.'})
    @ApiOkResponse({description: 'A list of constituent records.'})
    @Post()
    create(@Body() constituentDto: CreateConstituentDto): Promise<Constituent> {
        return this.constituentService.create(constituentDto);
    }

    @SkipAuth()
    @ApiOperation({summary: 'Update an existing constituent record, or create a new record if one does not exist.'})
    @ApiOkResponse({description: 'A constituent record.'})
    @Put(':email')
    update(
        @Param('email') email: string,
        @Body() updateMenuDto: UpdateConstituentDto,
    ): Promise<Constituent> {
        return this.constituentService.update(email, updateMenuDto);
    }

    @Delete(':email')
    @ApiOperation({summary: 'Delete an existing constituent record.'})
    @ApiOkResponse({description: '{ message: "deleted"}'})
    remove(@Param('email') email: string) {
        return this.constituentService.delete(email);
    }

    @ApiOperation({summary: 'Create many constituent records from a CSV file.'})
    @ApiOkResponse({description: 'The number of records processed.'})
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('upload')
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<number> {
        if (!file) {
            throw new BadRequestException(`file was invalid`);
        }

        let records = convertCSVToConstituents(file.buffer.toString());

        records.forEach((r) => {
            this.constituentService.create(r as CreateConstituentDto);
        });

        return records.length;


    }
}
