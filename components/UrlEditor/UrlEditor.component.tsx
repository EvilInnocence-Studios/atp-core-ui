import { overridable } from "@core/lib/overridable";
import {UrlEditorProps} from "./UrlEditor.d";
import styles from './UrlEditor.module.scss';
import { Label } from "../Label";
import { Editable } from "../Editable";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

export const UrlEditorComponent = overridable(({classes = styles, value, srcValue, onChange, placeholder, label}:UrlEditorProps) =>
    <div style={{position: "relative"}} className={classes.urlEditor}>
        <Label label={label || "Url"}>
            <Editable value={value || ""} onChange={onChange} placeholder={placeholder || "URL"} />
            {srcValue && <Button
                onClick={() => {
                    const name = srcValue || value || "";
                    const url = name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
                    onChange(url);
                }}
                type="link"
                style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "24px",
                    height: "24px",
                    background: "transparent",
                    border: "none",
                }}
            >
                <FontAwesomeIcon icon={faWandMagicSparkles} />
            </Button>}
        </Label>
    </div>
);
