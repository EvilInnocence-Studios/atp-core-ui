export declare interface IUploaderProps {
    percentDone: number | null;
    inProgress: boolean;
    onUpload: (file: File) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IUploaderInputProps<T> {
    upload: (file: File) => Promise<T>;
    onUploadSuccess?: (files: T[]) => void;
    classes?: any;
}

export type UploaderProps<T> = IUploaderInputProps<T> & IUploaderProps;