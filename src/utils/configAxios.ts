interface ObjHeaderConfig {
    params?: Object,
    headers?: Object,
}

export const configHeaderAxios = ({ params, headers }: ObjHeaderConfig) => {
    return {
        headers: { 'Authorization': 'JWT ' + 'NO TOKEN', ...headers },
        params: params,
    }
}