import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Constituent} from './constituent.entity';
import {CreateConstituentDto} from './dto/create.dto';
import {UpdateConstituentDto} from './dto/update.dto';

export const convertConstituentsToCSV = (results: Constituent[]) => {
    if (results.length > 0) {
        const data = [Object.keys(results[0]).join(',')];
        results.forEach((result: Constituent) => {
            data.push('"' + Object.values(result).join('","') + '"')
        })
        return String(data.join("\n"));
    } else {
        return ""
    }
};

export const convertCSVToConstituents = (csvString: string) => {
    let records: Constituent[] = [];

    const fileArray: string[] = csvString.toString().trim().split("\n");
    const headerFields: string[] = fileArray[0].split(",");

    for (let i = 1; i < fileArray.length; i++) {
        let record = {};
        let entry = fileArray[i].split(",");
        for (let j = 0; j < headerFields.length; j++) {
            record[headerFields[j]] = entry[j];
        }

        records.push(record as Constituent);
    }

    return records

};

@Injectable()
export class ConstituentService {
    constructor(
        @InjectRepository(Constituent)
        private readonly constituentRepository: Repository<Constituent>,
    ) {
    }

    async getAll(format: string = 'json'): Promise<Constituent[] | string> {
        const results = await this.constituentRepository.find({
            order: {
                signup: "DESC"
            }
        });
        switch (format) {
            case 'csv': {
                return convertConstituentsToCSV(results);
            }
            default: {
                return results;
            }
        }
    }

    async getOne(email: string): Promise<Constituent> {
        const constituent = await this.constituentRepository.find({
            where: {email: email},
        });
        if (!constituent) {
            throw new NotFoundException(`Could not find a record with ${email}`);
        }
        return constituent[0];
    }

    async create(constituentDto: CreateConstituentDto): Promise<Constituent> {
        const constituent = this.constituentRepository.create(constituentDto);
        return await this.constituentRepository.save(constituent);
    }

    async update(
        email: string,
        updateConstituentDto: UpdateConstituentDto,
    ): Promise<Constituent> {
        const menu = await this.getOne(email);
        Object.assign(menu, updateConstituentDto);
        return await this.constituentRepository.save(menu);
    }

    async delete(email: string) {
        const result = await this.constituentRepository.delete(email);
        if (result.affected === 0) {
            throw new NotFoundException(`Could not find a record with "${email}".`);
        }
        return {message: 'Deleted'};
    }
}
