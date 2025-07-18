import BookingTable from '@features/bookings/BookingTable';
import Heading from '@ui/Heading';
import Row from '@ui/Row';
import BookingTableOperations from '@features/bookings/BookingTableOperations';

const Bookings = () => {
    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>All Bookings</Heading>
                <BookingTableOperations />
            </Row>

            <BookingTable />
        </>
    );
};

export default Bookings;
