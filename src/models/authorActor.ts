
interface AuthorActor {
    id: string,
    name: string,
    type: number,
    status: number,
    createdBy: string,
    createdAt: string,
}

export interface AuthorActorSlice {
    loadingFetch: boolean,
    loadingCreate: boolean,
    statusCreated: number,
    statusUpdated: number,
    statusDeleted: number,

    authorActors: Array<AuthorActor> | [],

    totalPage: number,
    currentPage: number,

    errorMessage: string,

    totalRows: number,

    id: null,
    search: string,
    type: number,
    authorActorName: string,
}