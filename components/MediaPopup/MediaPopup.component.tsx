import { Modal } from "antd";
import {MediaPopupProps} from "./MediaPopup.d";
import styles from './MediaPopup.module.scss';
import { MediaSwitcher } from "../MediaSwitcher";

export const MediaPopupComponent = ({media, getId, render, isOpen, open, close, selectedImage}:MediaPopupProps) =><>
    <Modal open={isOpen} onClose={close} onCancel={close} footer={null}>
        <div className={styles.switcher}>
            <MediaSwitcher
                media={media}
                getId={getId}
                defaultMediaId={selectedImage}
                render={render}
            />
        </div>
    </Modal>
    <div className={styles.mediaList}>
        {media.map(item =>
            <div key={getId(item)} className={styles.mediaItem} onClick={open(getId(item))}>
                {render(item)}
            </div>
        )}
    </div>
</>;
