import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';

import { Suspense } from 'react';

export const generateMetadata = async ({ params }) => {
    const { name } = await getCabin(params.cabinId);
    return { title: `Cabin ${name}` };
};

export const generateStaticParams = async () => {
    const cabins = await getCabins();
    const mapFn = (cabin) => ({ cabinId: String(cabin.id) });
    return cabins.map(mapFn);
};

const Page = async ({ params }) => {
    const cabin = await getCabin(params.cabinId);

    return (
        <div className='max-w-6xl mx-auto mt-8'>
            <Cabin cabin={cabin} />
            <div>
                <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
                    Reserve cabin {cabin.name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
};

export default Page;
