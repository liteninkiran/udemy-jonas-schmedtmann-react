import { getBooking } from '@services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useBooking() {
    const { bookingId } = useParams();
    const options = {
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false,
    };
    const { isLoading, data: booking, error } = useQuery(options);

    return { isLoading, error, booking };
}
