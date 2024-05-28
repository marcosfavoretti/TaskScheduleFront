import { TaskDetail } from "./taskdetail";

export class Task {
    taskDetails!: TaskDetail;
    nullArray!: any[];
    stringArray!: string[];
    additionalDetail!: TaskDetail;
    cronDetails!: string[];
    expiryDetail!: TaskDetail;
}