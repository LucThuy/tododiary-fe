import { DefaultLayout } from '../components/Layout';
import TodayTodo from '~/pages/TodayTodo';
import DiaryHistory from '~/pages/DiaryHistory'

const publicRoutes = [
    { path: '/todaytodo', component: TodayTodo, layout: DefaultLayout },
    { path: '/diaryhistory', component: DiaryHistory, layout: DefaultLayout },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
