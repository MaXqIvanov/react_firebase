export type todoState = {
    loading: boolean,
    todos: Array<TTodo>,
    current_todo: TTodo,
    current_index: number
}
export type userState = {
    loading: boolean,
    user: Object
}
export type TTodo = {
    id: number,
    name: string,
    token: string,
    tasks: Array<Object>,
    current_index_task: number
}