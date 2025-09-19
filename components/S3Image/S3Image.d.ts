export declare interface IS3ImageProps {
    fullFileName: string;
}

// What gets passed into the component from the parent as attributes
export declare interface IS3ImageInputProps {
    folderSetting: string;
    fileName: string;
    className?: string;
}

export type S3ImageProps = IS3ImageInputProps & IS3ImageProps;