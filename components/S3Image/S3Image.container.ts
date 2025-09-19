import { createInjector, inject, mergeProps } from "unstateless";
import {S3ImageComponent} from "./S3Image.component";
import {IS3ImageInputProps, S3ImageProps, IS3ImageProps} from "./S3Image.d";
import { useFullImageUrl } from "@common/components/MediaImage/MediaImage.container";

const injectS3ImageProps = createInjector(({folderSetting, fileName}:IS3ImageInputProps):IS3ImageProps => {
    const fullFileName = useFullImageUrl(folderSetting, fileName);
    
    return {fullFileName};
});

const connect = inject<IS3ImageInputProps, S3ImageProps>(mergeProps(
    injectS3ImageProps,
));

export const S3Image = connect(S3ImageComponent);
