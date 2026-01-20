import { overridable } from "@core/lib/overridable";
import { faGear, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch, Tabs } from "antd";
import clsx from "clsx";
import { Label } from "../Label";
import { ResponsiveValueProps } from "./ResponsiveValue.d";
import styles from './ResponsiveValue.module.scss';

export const ResponsiveValueComponent = overridable(({
    className, classes = styles, value, onChange, label, editor,
}:ResponsiveValueProps<any>) =>
    <div className={clsx([className, classes.responsiveValue])}>
    <Label
        label={<>
            {label}&nbsp;
            <Switch
                size="small"
                checked={typeof value === 'object'}
                checkedChildren={<FontAwesomeIcon icon={faSliders} />}
                unCheckedChildren={<FontAwesomeIcon icon={faGear} />}
                onChange={(checked) => onChange(checked
                    ? {xs: value}
                    : (value.xs || value.sm || value.md || value.lg || value.xl || value.xxl)
                )}
            />
        </>}
    >
        {typeof value !== 'object' && 
            editor(value, onChange)
        }
        {typeof value === 'object' && !!value &&
            <Tabs className={classes.tabs}>
                {["xs", "sm", "md", "lg", "xl", "xxl"].map((key) => <Tabs.TabPane tab={key} key={key}>
                    {editor(value[key], (newValue) => onChange({...value as any, [key]: newValue}))}
                </Tabs.TabPane>)}
            </Tabs>
        }
    </Label>
    </div>
);
