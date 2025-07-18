import TableOperations from '@ui/TableOperations';
import Filter from '@ui/Filter';
import SortBy from '@ui/SortBy';
import { getSortArray } from '@utils/helpers';

const CabinTableOperations = () => {
    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: 'no-discount', label: 'No Discount' },
        { value: 'discounted', label: 'Discounted' },
    ];
    const sortableFields = [
        { value: 'name', label: 'Name' },
        { value: 'regularPrice', label: 'Price' },
        { value: 'maxCapacity', label: 'Capacity' },
    ];
    return (
        <TableOperations>
            <Filter filterField='discount' options={filterOptions} />
            <SortBy options={getSortArray(sortableFields)} />
        </TableOperations>
    );
};

export default CabinTableOperations;
