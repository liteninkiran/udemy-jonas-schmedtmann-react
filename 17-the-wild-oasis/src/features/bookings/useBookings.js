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

    const options = {
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    };
    const { isLoading, data: bookings, error } = useQuery(options);

    return { isLoading, error, bookings };
}
