const { default: axiosClient } = require("./axiosClient");


const folderApi = {
    getFolder: (folderId: number) => {
        const url = `api/folder/all?fol_id=${folderId}`;
        return axiosClient.get(url);
    },
}

export default folderApi;