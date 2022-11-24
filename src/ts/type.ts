export type todoState = {
    loading: boolean,
    todos: Array<TTodo>,
    current_todo: TTodo,
    current_index: number,
    current_index_task: number,
}
export type userState = {
    loading: boolean,
    user: Object
}
export type TTodo = {
    id: number,
    name: string,
    token: string,
    tasks: Array<TTask>,
    current_index_task: number
}
export type TTask = {
    id: number,
    name: string,
    complete: boolean
}