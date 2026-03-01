import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import isotypeTransparent from '~/assets/isotypeTransparent.png';
import logotype from '~/assets/logotype.svg';
import { ROUTES } from '~/routes/routes';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(ROUTES.CALCULATOR);
        }, 3000);
    }, []);

    return (
        <div className="flex min-h-[60vh] w-full animate-pulse flex-col items-center justify-center gap-10">
            <img src={isotypeTransparent} alt="TeLasCalculo App" className="" />
            <img
                src={logotype}
                alt="TeLasCalculo App"
                className="object-cover brightness-100"
            />
            <p>Loading ...</p>
        </div>
    );
}
