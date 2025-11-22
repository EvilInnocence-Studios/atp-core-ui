import { Modal } from "antd";
import { MediaPopupProps } from "./MediaPopup.d";
import styles from './MediaPopup.module.scss';
import { MediaSwitcher } from "../MediaSwitcher";
import clsx from "clsx";
import { overridable } from "@core/lib/overridable";

export const MediaPopupComponent = overridable(({ media, getId, render, isOpen, open, close, selectedImage, vertical, classes = styles }: MediaPopupProps) => <>
    <Modal open={isOpen} onClose={close} onCancel={close} footer={null}>
        <div className={classes.switcher}>
            <MediaSwitcher
                media={media}
                getId={getId}
                defaultMediaId={selectedImage}
                render={render}
            />
        </div>
    </Modal>
    <div className={clsx([classes.mediaList, vertical ? classes.vertical : classes.horizontal])}>
        {media.map(item =>
            <div key={getId(item)} className={classes.mediaItem} onClick={open(getId(item))}>
                {render(item)}
            </div>
        )}
    </div>
</>);
