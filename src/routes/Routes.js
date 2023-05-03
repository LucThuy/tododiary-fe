import { DefaultLayout, NoSidebarLayout } from '../layouts';
import config from '~/config';
import TodayTodo from '~/pages/TodayTodo';
import DiaryHistory from '~/pages/DiaryHistory';
import Profile from '~/pages/Profile';
import SmallStore from '~/pages/SmallStore';
import Auth from '~/pages/Auth';
import NotFoundError from '../pages/NotFoundError/NotFoundError';

const NotFoundRoute = NotFoundError;

const publicRoutes = [
    {
        path: config.routes.auth,
        component: Auth,
        layout: NoSidebarLayout,
    },
];

const privateRoutes = [
    {
        path: config.routes.todaytodo,
        component: TodayTodo,
        layout: DefaultLayout,
    },
    {
        path: config.routes.diaryhistory,
        component: DiaryHistory,
        layout: DefaultLayout,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: DefaultLayout,
    },
    {
        path: config.routes.smallstore,
        component: SmallStore,
        layout: DefaultLayout,
    },
];

export { publicRoutes, privateRoutes, NotFoundRoute };
