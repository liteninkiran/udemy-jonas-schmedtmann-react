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

    const mapFn = (cabin) => <CabinRow cabin={cabin} key={cabin.id} />;

    const filterValue = searchParams.get('discount') || 'all';

    let filteredCabins;
    if (filterValue === 'all') {
        filteredCabins = cabins;
    }
    if (filterValue === 'no-discount') {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    }
    if (filterValue === 'discounted') {
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    }

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
                <Table.Body data={filteredCabins} render={mapFn} />
            </Table>
        </Menus>
    );
};

export default CabinTable;
