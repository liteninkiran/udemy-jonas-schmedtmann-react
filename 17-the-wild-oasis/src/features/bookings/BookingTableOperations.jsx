import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';
import { getSortArray } from '@utils/helpers';

const BookingTableOperations = () => {
    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: 'checked-out', label: 'Checked out' },
        { value: 'checked-in', label: 'Checked in' },
        { value: 'unconfirmed', label: 'Unconfirmed' },
    ];
    const sortableFields = [
        { value: 'startDate', label: 'Start Date' },
        { value: 'totalPrice', label: 'Total Price' },
    ];

    return (
        <TableOperations>
            <Filter filterField='status' options={filterOptions} />
            <SortBy options={getSortArray(sortableFields)} />
        </TableOperations>
    );
};

export default BookingTableOperations;
