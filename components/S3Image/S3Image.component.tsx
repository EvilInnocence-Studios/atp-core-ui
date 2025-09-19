import {S3ImageProps} from "./S3Image.d";
import styles from './S3Image.module.scss';

export const S3ImageComponent = ({fullFileName, className}:S3ImageProps) =>
    <img className={className} src={fullFileName} />;
