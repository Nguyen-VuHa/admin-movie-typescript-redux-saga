export interface FolderSystem {
    listFolder: Array<string>,
    selectFolder: Array<SelectFolder>,
    listFile: Array<string>,
    loadingFetchFolder: boolean,
}

type SelectFolder = {
    id: number;
    folderName: string;
};
   