import { createBrowserRouter } from 'react-router-dom';

import App from '~/App';
import { About, Calculator, Home } from '~/screens';

import { ROUTES } from './routes';

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: ROUTES.HOME,
                    element: <Home />,
                },
                {
                    path: ROUTES.CALCULATOR,
                    element: <Calculator />,
                },
                {
                    path: ROUTES.ABOUT,
                    element: <About />,
                },
            ],
        },
    ],
    { basename: import.meta.env.BASE_URL }
);
