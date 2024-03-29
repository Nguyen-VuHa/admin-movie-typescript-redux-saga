
interface Categories {
    id: string,
    category_name: string,
    createdBy: string,
    status: number,
    createdAt: string,
}

export interface CategorySlice {
    loadingFetch: boolean,
    loadingCreate: boolean,
    statusCreated: number,
    statusUpdated: number,
    statusDeleted: number,
    categories: Array<Categories> | [],
    categorySelect: Array<any> | [],
    totalPage: number,
    currentPage: number,
    errorMessage: string,
    totalRows: number,
    id: null,
    categoryNameUpdate: string,
    search: string,
}