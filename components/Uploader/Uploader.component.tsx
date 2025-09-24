import { Progress, Upload } from "antd";
import {UploaderProps} from "./Uploader.d";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";

export const UploaderComponent = <T extends {}>({onUpload, percentDone, inProgress}:UploaderProps<T>) =>
    <Upload.Dragger
        showUploadList={false}
        customRequest={({file}) => onUpload(file as File)}
        disabled={percentDone !== null && percentDone < 100}
        multiple
    >
        {!inProgress && <>
            <FontAwesomeIcon icon={faUpload} />
            Click or drag file to this area to upload
        </>}
        {inProgress && percentDone !== null
            ? <>
                <FontAwesomeIcon icon={faSpinner} spin /> Uploading...<br/>
                <Progress percent={percentDone} size="small" status="active" />
            </>
            : null
        }
    </Upload.Dragger>;
