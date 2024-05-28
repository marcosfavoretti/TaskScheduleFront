import { TaskDatabase } from "./taskdatabase";
import { TaskDetail } from "./taskdetail";
import { IsString, ValidateNested } from 'class-validator'
import { Type } from "class-transformer";
export class TaskHttpResponse {
    // task!: TaskDetail[]
    // database!: TaskDatabase

    @ValidateNested({ each: true })
    @Type(() => TaskDetail)
    task!: TaskDetail[];

    @ValidateNested()
    @Type(() => TaskDatabase)
    database!: TaskDatabase

    @IsString()
    lastexec!: string
}