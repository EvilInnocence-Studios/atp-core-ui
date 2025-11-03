import { overridable } from "@core/lib/overridable";
import { useModal } from "@core/lib/useModal";
import { useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { MediaPopupComponent } from "./MediaPopup.component";
import { IMediaPopupInputProps, IMediaPopupProps, MediaPopupProps } from "./MediaPopup.d";

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

export const MediaPopup = overridable<IMediaPopupInputProps<any>>(connect(MediaPopupComponent));
