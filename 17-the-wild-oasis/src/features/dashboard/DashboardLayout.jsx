import styled from 'styled-components';

import { useCabins } from '@features/cabins/useCabins';
import TodayActivity from '@features/check-in-out/TodayActivity';
import Spinner from '@ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

const DashboardLayout = () => {
    const { bookings, isLoading: isLoading1 } = useRecentBookings();
    const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
    const { cabins, isLoading: isLoading3 } = useCabins();
    if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                availableNights={numDays * cabins.length}
            />
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
