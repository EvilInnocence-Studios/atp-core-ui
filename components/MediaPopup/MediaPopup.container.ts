import { createInjector, inject, mergeProps } from "unstateless";
import {MediaPopupComponent} from "./MediaPopup.component";
import {IMediaPopupInputProps, MediaPopupProps, IMediaPopupProps} from "./MediaPopup.d";
import { useState } from "react";
import { useModal } from "@core/lib/useModal";

const injectMediaPopupProps = createInjector(<T>({}:IMediaPopupInputProps<T>):IMediaPopupProps => {
    const [selectedImage, setSelectedImage] = useState<string| null>(null);
    const modal = useModal();

    const open = (id:string) => () => {
        setSelectedImage(id);
        modal.open();
    }
    
    return {selectedImage, isOpen: modal.visible, open, close: modal.close};
});

const connect = inject<IMediaPopupInputProps<any>, MediaPopupProps>(mergeProps(
    injectMediaPopupProps,
));

export const MediaPopup = connect(MediaPopupComponent);
