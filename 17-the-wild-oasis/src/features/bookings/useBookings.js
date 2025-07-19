import { useQuery } from '@tanstack/react-query';
import { getBookings } from '@services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
    const [searchParams] = useSearchParams();

    // Filtering
    const filterValue = searchParams.get('status');
    const hasFilter = filterValue && filterValue !== 'all';
    const filterObj = { field: 'status', value: filterValue };
    const filter = hasFilter ? filterObj : null;

    // Sorting
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    // Pagination
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    const options = {
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    };
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery(options);

    return { isLoading, error, bookings, count };
}
