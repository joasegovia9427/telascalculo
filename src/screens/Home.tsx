import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imagotypeTransparent from '~/assets/imagotypeTransparent.png';
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
            <img
                src={imagotypeTransparent}
                alt="TeLasCalculo App"
                className=""
            />
            <p>Loading ...</p>
        </div>
    );
}
