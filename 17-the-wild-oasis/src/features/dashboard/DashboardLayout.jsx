import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '@ui/Spinner';
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
    if (isLoading1 || isLoading2) return <Spinner />;
    return (
        <StyledDashboardLayout>
            <div>Statistics</div>
            <div>Today`s Activities</div>
            <div>Chart Stay Duration</div>
            <div>Chart Sales</div>
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
