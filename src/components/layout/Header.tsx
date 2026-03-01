import { Link } from 'react-router-dom';

import isotypeTransparent from '~/assets/isotypeTransparent.png';
import logotype from '~/assets/logotype.svg';
import { ROUTES } from '~/routes/routes';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link to={ROUTES.HOME} className="text-2xl font-bold">
                    <div className="flex flex-row gap-3">
                        <img
                            src={isotypeTransparent}
                            alt="TeLasCalculo App"
                            className="w-12 object-cover"
                        />
                        <img
                            src={logotype}
                            alt="TeLasCalculo App"
                            className="h-12 object-cover brightness-1 invert"
                        />
                    </div>
                </Link>
                <div className="hidden gap-6 sm:flex">
                    <Link
                        to={ROUTES.HOME}
                        className="hover:text-accent-light transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to={ROUTES.CALCULATOR}
                        className="hover:text-accent-light transition-colors"
                    >
                        Calculator
                    </Link>
                    <Link
                        to={ROUTES.ABOUT}
                        className="hover:text-accent-light transition-colors"
                    >
                        About
                    </Link>
                </div>
            </nav>
        </header>
    );
}
