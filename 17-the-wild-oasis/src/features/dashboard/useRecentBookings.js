import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '@services/apiBookings';

export const useRecentBookings = () => {
    const [searchParams] = useSearchParams();
    const last = searchParams.get('last');
    const numDays = last ? Number(last) : 7;
    const queryDate = subDays(new Date(), numDays).toISOString();
    const queryFn = () => getBookingsAfterDate(queryDate);
    const queryKey = ['bookings', `last-${numDays}`];
    const { isLoading, data: bookings } = useQuery({ queryFn, queryKey });

    return { isLoading, bookings };
};
