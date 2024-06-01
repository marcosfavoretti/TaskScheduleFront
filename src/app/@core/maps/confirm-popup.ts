import { ButtonActions } from "../enum/button-actions.enum";

export const popupFrases: Record<ButtonActions, string> = {
    delete: "Tem certeza que deseja EXCLUIR essa tarefa?",
    run: "Tem certeza que deseja RODAR essa tarefa?",
    switch: "Tem certeza que deseja ATIVAR/DESATIVAR essa tarefa?",
    update: "Tem certeza que deseja EDITAR essa tarefa?",
    update_submit: "",
    create: "Tem certeza que deseja CRIAR essa tarefa"
}