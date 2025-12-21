import { overridable } from "@core/lib/overridable";
import { objMap } from "ts-functional";
import { Index } from "ts-functional/dist/types";
import { LayoutComponent as LayoutComponentComponent } from "@theming/components/LayoutComponent";
import { LayoutProps } from "./Layout.d";

export const LayoutComponent = overridable(({ theme: { theme, css , layout} }: LayoutProps) =>
    <>
        {!!theme && <style>
            {Object.values(objMap((group: Index<string>, groupName) =>
                Object.values(objMap((value, name) =>
                    `--${groupName}-${name}: ${value};`
                )(group))
            )(theme))}
        </style>}
        {!!css && <style>{css}</style>}
        <LayoutComponentComponent {...layout} />
    </>
);
