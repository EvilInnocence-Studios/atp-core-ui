import { Modal } from "antd";
import {MediaPopupProps} from "./MediaPopup.d";
import styles from './MediaPopup.module.scss';
import { MediaSwitcher } from "../MediaSwitcher";
import clsx from "clsx";

export const MediaPopupComponent = ({media, getId, render, isOpen, open, close, selectedImage, vertical}:MediaPopupProps) =><>
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
    <div className={clsx([styles.mediaList, vertical ? styles.vertical : styles.horizontal])}>
        {media.map(item =>
            <div key={getId(item)} className={styles.mediaItem} onClick={open(getId(item))}>
                {render(item)}
            </div>
        )}
    </div>
</>;
