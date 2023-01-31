interface ObjHeaderConfig {
    params: Object,
}

export const configHeaderAxios = ({ params }: ObjHeaderConfig) => {
    return {
        headers: {'Authorization': 'JWT ' + 'NO TOKEN'},
        params: params,
    }
}