import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '@services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '@utils/constants';

export function useBookings() {
    const queryClient = useQueryClient();
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

    // Pre-fecthing
    const pageCount = Math.ceil(count / PAGE_SIZE);

    const prefetch = (pg) => {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, pg],
            queryFn: () => getBookings({ filter, sortBy, page: pg }),
        });
    };

    if (page < pageCount) {
        prefetch(page + 1);
    }

    if (page > 1) {
        prefetch(page - 1);
    }

    return { isLoading, error, bookings, count };
}
