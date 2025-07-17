import TableOperations from '@ui/TableOperations';
import Filter from '@ui/Filter';
// import SortBy from '@ui/SortBy';

const CabinTableOperations = () => {
    const options = [
        { value: 'all', label: 'All' },
        { value: 'no-discount', label: 'No Discount' },
        { value: 'discounted', label: 'Discounted' },
    ];
    return (
        <TableOperations>
            <Filter filterField='discount' options={options} />
        </TableOperations>
    );
};

export default CabinTableOperations;
