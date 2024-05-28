import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { TaskDetail } from "./taskdetail";
import { TaskDatabase } from "./taskdatabase";

export class TaskResultList {

    @ValidateNested()
    @Type(() => TaskDetail)
    task!: TaskDetail;

    @ValidateNested()
    @Type(() => TaskDatabase)
    database!: TaskDatabase

    @IsString()
    lastexec!: string
}