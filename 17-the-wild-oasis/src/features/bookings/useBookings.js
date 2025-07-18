import { useQuery } from '@tanstack/react-query';
import { getBookings } from '@services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get('status');
    const hasFilter = filterValue && filterValue !== 'all';
    const filterObj = { field: 'status', value: filterValue };
    const filter = hasFilter ? filterObj : null;

    const options = {
        queryKey: ['bookings', filter],
        queryFn: () => getBookings({ filter }),
    };
    const { isLoading, data: bookings, error } = useQuery(options);

    return { isLoading, error, bookings };
}
