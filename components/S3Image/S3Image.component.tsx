import { overridable } from "@core/lib/overridable";
import {S3ImageProps} from "./S3Image.d";

export const S3ImageComponent = overridable(({fullFileName, className}:S3ImageProps) =>
    <img className={className} src={fullFileName} />
);
