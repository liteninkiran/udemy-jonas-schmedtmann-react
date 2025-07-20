import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '@services/apiBookings';

export const useRecentStays = () => {
    const [searchParams] = useSearchParams();
    const last = searchParams.get('last');
    const numDays = last ? Number(last) : 7;
    const queryDate = subDays(new Date(), numDays).toISOString();
    const queryFn = () => getStaysAfterDate(queryDate);
    const queryKey = ['stays', `last-${numDays}`];
    const { isLoading, data: stays } = useQuery({ queryFn, queryKey });
    const filterFn = (stay) =>
        stay.status === 'checked-in' || stay.status === 'checked-out';
    const confirmedStays = stays?.filter(filterFn);

    return { isLoading, stays, confirmedStays, numDays };
};
