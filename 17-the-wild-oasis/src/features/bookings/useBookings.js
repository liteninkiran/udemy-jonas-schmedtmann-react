import { useQuery } from '@tanstack/react-query';
import { getBookings } from '@services/apiBookings';

export function useBookings() {
    const options = {
        queryKey: ['bookings'],
        queryFn: getBookings,
    };
    const { isLoading, data: bookings, error } = useQuery(options);

    return { isLoading, error, bookings };
}
