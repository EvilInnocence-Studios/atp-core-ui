import { Page } from "@common/components/Page";
import { config } from "@config";
import { withRoute } from "@core/lib/withRoute";
import { Route, Routes } from "react-router";
import { ContentProps } from "./Content.d";

export const ContentComponent = ({}:ContentProps) =>
    <Routes>
        {config().routes.map((route, index) => (
            <Route key={index} path={route.path} Component={route.component} />
        ))}
        <Route path="/:slug" Component={withRoute(Page)} />
        <Route path="*" Component={() => <Page slug="404"/>} />
    </Routes>;
