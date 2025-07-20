import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '@ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabins } from '@features/cabins/useCabins';

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
            <div>Today`s Activities</div>
            <div>Chart Stay Duration</div>
            <div>Chart Sales</div>
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
