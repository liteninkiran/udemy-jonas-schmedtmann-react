import { useSearchParams } from 'react-router-dom';

import Spinner from '@ui/Spinner';
import Table from '@ui/Table';
import Menus from '@ui/Menus';

import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

const CabinTable = () => {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    const cabinMapFn = (cabin) => <CabinRow cabin={cabin} key={cabin.id} />;

    // Filtering
    const filterValue = searchParams.get('discount') || 'all';
    const filterEq = (cabin) => cabin.discount === 0;
    const filterGt = (cabin) => cabin.discount > 0;
    const filterFn = filterValue === 'no-discount' ? filterEq : filterGt;
    const filteredCabins =
        filterValue === 'all' ? cabins : cabins.filter(filterFn);

    // Sorting
    const sortBy = searchParams.get('sortBy') || 'startDate-asc';
    const [field, direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    const sortFn = (a, b) => (a[field] - b[field]) * modifier;
    const sortedCabins = filteredCabins.sort(sortFn);

    return (
        <Menus>
            <Table $columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body data={sortedCabins} render={cabinMapFn} />
            </Table>
        </Menus>
    );
};

export default CabinTable;
