import React, { useState, useCallback } from 'react'

interface ImageProps {
    src: string,
    alt: string,
    style?: Object,
    className?: string,
}

function Image({ src, alt, className, style }: ImageProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Wait for the upload to complete => set loading to false and show image
    const handleImageLoaded = useCallback(() => {
        setIsLoading(false);
    }, []);
    

    return (
        <div
            className={`${isLoading ? 'skeleton-loading' : ''} ${className ? className : ''}`}
            style={style}
        >
            <img
                src={src}
                alt={alt}
                width="100%"
                height="100%"
                onLoad={handleImageLoaded}
                style={isLoading ? { display: 'none' } : { display: 'block', backgroundSize: "cover" }}
            />
        </div>
    )
}

export default Image