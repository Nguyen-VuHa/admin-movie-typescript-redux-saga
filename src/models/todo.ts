export interface Todo {
    id?: string,
    todoName: string,
    status: number,
}

export interface ListTodo {
    arrTodo: Array<Todo>,
}