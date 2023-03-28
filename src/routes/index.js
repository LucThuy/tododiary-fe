import { DefaultLayout } from '../components/Layout';
import TodayTodo from '~/pages/TodayTodo';
import DiaryHistory from '~/pages/DiaryHistory';
import Profile from '~/pages/Profile';
import SmallStore from '~/pages/SmallStore';

const publicRoutes = [
    { path: '/todaytodo', component: TodayTodo, layout: DefaultLayout },
    { path: '/diaryhistory', component: DiaryHistory, layout: DefaultLayout },
    { path: '/profile', component: Profile, layout: DefaultLayout },
    { path: '/smallstore', component: SmallStore, layout: DefaultLayout },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
