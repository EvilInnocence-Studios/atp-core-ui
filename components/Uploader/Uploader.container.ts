import { flash } from "@core/lib/flash";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { UploaderComponent } from "./Uploader.component";
import { IUploaderInputProps, IUploaderProps } from "./Uploader.d";

const injectUploaderProps = createInjector(<T extends {}>({upload, onUploadSuccess}:IUploaderInputProps<T>):IUploaderProps => {
    const [uploadCount, setUploadCount] = useState(0);
    const [finishedUploads, setFinishedUploads] = useState<T[]>([]);

    const inProgress = uploadCount > 0 && finishedUploads.length < uploadCount;
    const percentDone = uploadCount > 0 ? Math.round((finishedUploads.length / uploadCount) * 100) : null;

    useEffect(() => {
        console.log(`Finished ${finishedUploads.length} of ${uploadCount} uploads`);
        if(finishedUploads.length === uploadCount && uploadCount > 0) {
            console.log("All uploads finished");
            if (onUploadSuccess) {
                console.log("Calling onUploadSuccess with", finishedUploads);
                onUploadSuccess(finishedUploads);
            }
            setUploadCount(0);
            setFinishedUploads([]);
        }
    }, [finishedUploads, uploadCount]);

    const onUpload = async (file: File) => {
        setUploadCount(c => c + 1);
        try {
            const newObj = await upload(file);
            setFinishedUploads(f => [...f, newObj]);
        } catch (e) {
            flash.error("Upload failed");
            setUploadCount(c => c - 1);
        }
    };

    return {onUpload, inProgress, percentDone};
});

const connect = inject(mergeProps(
    injectUploaderProps,
));

export const Uploader = connect(UploaderComponent as any);
