const { default: axiosClient } = require("./axiosClient");

const categoriesApi = {
    fetchAllCategoryApi: (payload: any) => {
        const url = `api/category/all?_p=${payload.page}&_s=${payload.search}`;
        return axiosClient.get(url);
    },
    createCategoryApi: (payload: any) => {
        const url = `api/category/create`;
        return axiosClient.post(url, payload);
    },
    updateCategoryApi: (payload: any) => {
        const url = `api/category/update`;
        return axiosClient.put(url, payload);
    },
    updateStatusCateApi: (payload: any) => {
        const url = `api/category/update-status/${payload}`;
        return axiosClient.get(url);
    },
    deleteCategoryApi: (payload: any) => {
        const url = `api/category/delete/${payload}`;
        return axiosClient.delete(url);
    },
}

export default categoriesApi;