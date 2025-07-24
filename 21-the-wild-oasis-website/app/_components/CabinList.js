import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '@/app/_lib/data-service';

const CabinList = async ({ filter }) => {
    const cabins = await getCabins();

    const mapFn = (cabin) => <CabinCard cabin={cabin} key={cabin.id} />;

    if (!cabins.length) return null;

    const filterSmall = (cabin) => cabin.maxCapacity <= 3;
    const filterMedium = (cabin) =>
        cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
    const filterLarge = (cabin) => cabin.maxCapacity >= 8;

    let displayedCabins;
    if (filter === 'all') displayedCabins = cabins;
    if (filter === 'small') displayedCabins = cabins.filter(filterSmall);
    if (filter === 'medium') displayedCabins = cabins.filter(filterMedium);
    if (filter === 'large') displayedCabins = cabins.filter(filterLarge);

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
            {displayedCabins.map(mapFn)}
        </div>
    );
};

export default CabinList;
