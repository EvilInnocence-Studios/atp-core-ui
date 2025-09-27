import {S3ImageProps} from "./S3Image.d";

export const S3ImageComponent = ({fullFileName, className}:S3ImageProps) =>
    <img className={className} src={fullFileName} />;
