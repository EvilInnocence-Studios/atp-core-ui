import { overridable } from "@core/lib/overridable";
import { Modal } from "antd";
import clsx from "clsx";
import { MediaSwitcher } from "../MediaSwitcher";
import { MediaPopupProps } from "./MediaPopup.d";
import styles from "./MediaPopup.module.scss";

export const MediaPopupComponent = overridable(({ media, getId, render, isOpen, open, close, selectedImage, vertical, classes = styles }: MediaPopupProps) => <>
    <Modal open={isOpen} onOk={close} onCancel={close} footer={null}>
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
