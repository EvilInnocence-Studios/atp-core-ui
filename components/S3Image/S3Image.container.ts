import { useFullImageUrl } from "@common/components/MediaImage/MediaImage.container";
import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { S3ImageComponent } from "./S3Image.component";
import { IS3ImageInputProps, IS3ImageProps, S3ImageProps } from "./S3Image.d";

const injectS3ImageProps = createInjector(({folderSetting, fileName}:IS3ImageInputProps):IS3ImageProps => {
    const fullFileName = useFullImageUrl(folderSetting, fileName);
    
    return {fullFileName};
});

const connect = inject<IS3ImageInputProps, S3ImageProps>(mergeProps(
    injectS3ImageProps,
));

export const S3Image = overridable<IS3ImageInputProps>(connect(S3ImageComponent));
