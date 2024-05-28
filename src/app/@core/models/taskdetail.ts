export class TaskDetail {
    running!: boolean;
    lastExecution!: any; // Pode ser Date ou null, dependendo do uso
    runOnce!: boolean;
    _callbacks!: string;
    context!: string;
    cronTime!: string;
    _timeout!: string;
}