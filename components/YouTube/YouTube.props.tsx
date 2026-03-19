import { IYouTubeInputProps } from "./YouTube.d";
import { Label } from "@core/components/Label";
import { Editable } from "@core/components/Editable";

export const YouTubePropEditor = (
    {videoId}: IYouTubeInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Video ID">
            <Editable value={videoId || ""} onChange={updateProp("videoId")} />
        </Label>
    );
}
