import { Outlet } from 'react-router-dom';

import { Header } from '~/components';

function App() {
    return (
        <div className="min-h-screen min-w-0 bg-gray-50">
            <Header />
            <main className="mx-auto p-3 sm:p-4 lg:container">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
