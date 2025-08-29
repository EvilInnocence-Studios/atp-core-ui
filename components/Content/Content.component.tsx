import { config } from "@config";
import { NotFoundPage } from "@public/components/NotFoundPage";
import { Route, Routes } from "react-router";
import { ContentProps } from "./Content.d";
import { Page } from "@common/components/Page";
import { withRoute } from "@core/lib/withRoute";

export const ContentComponent = ({}:ContentProps) =>
    <Routes>
        {config().routes.map((route, index) => (
            <Route key={index} path={route.path} Component={route.component} />
        ))}
        <Route path="/:slug" Component={withRoute(Page)} />
        <Route path="*" Component={NotFoundPage} />
    </Routes>;
