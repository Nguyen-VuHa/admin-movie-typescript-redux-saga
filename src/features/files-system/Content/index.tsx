import React, { useRef } from 'react'
import { useAppSelector } from 'app/hooks';
import FolderView from './FolderView';

function ContentFileSystem() {
    const layoutRef = useRef<HTMLDivElement>(null);

    const { listFolder } = useAppSelector(state => state.folderState);

    return (
        <div 
            style={{padding: '0 15px', height: '100%' }} ref={layoutRef}
            onContextMenu={(e) => {
                console.log(123);
            }}
        >
            {
                listFolder.length > 0 && <FolderView />
            }
        </div>
    )
}

export default ContentFileSystem