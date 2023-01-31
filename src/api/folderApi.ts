import { configHeaderAxios } from "utils/configAxios";

const { default: axiosClient } = require("./axiosClient");


const folderApi = {
    getFolder: (folderId: number) => {
        const url = `api/folder/all`;

        const config = configHeaderAxios({
            params: {
                fol_id: folderId,
            }
        });

        return axiosClient.get(url, config);
    },
}

export default folderApi;