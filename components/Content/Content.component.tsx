import { Page } from "@common/components/Page";
import { config } from "@config";
import { withRoute } from "@core/lib/withRoute";
import { Route, Routes } from "react-router";
import { ContentProps } from "./Content.d";
import { overridable } from "@core/lib/overridable";
import styles from "./Content.module.scss";

export const ContentComponent = overridable(({isEditing }: ContentProps) => <>
    {!isEditing && <Routes>
        {config().routes.map((route, index) => (
            <Route key={index} path={route.path} Component={route.component} />
        ))}
        <Route path="/:slug" Component={withRoute(Page)} />
        <Route path="*" Component={() => <Page slug="404" />} />
    </Routes>}
    {isEditing && <div className={styles.contentPlaceholder}>
        <h3>Page Content Area</h3>
        <p>
            This area will display the main content of your page.
        </p>
    </div>}
</>);
