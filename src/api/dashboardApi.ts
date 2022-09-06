const { default: axiosClient } = require("./axiosClient");

const dashboardApi = {
    fetchDataOverViewApi: () => {
        const url = `api/admin/dashboard/overview`;
        return axiosClient.get(url);
    },
}

export default dashboardApi;