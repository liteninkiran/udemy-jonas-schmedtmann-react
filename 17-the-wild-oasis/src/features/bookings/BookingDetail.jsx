import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import ButtonGroup from '@ui/ButtonGroup';
import Button from '@ui/Button';
import ButtonText from '@ui/ButtonText';
import Heading from '@ui/Heading';
import Row from '@ui/Row';
import Tag from '@ui/Tag';
import Spinner from '@ui/Spinner';

import { useMoveBack } from '@hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useCheckout } from '@features/check-in-out/useCheckout';
import Modal from '@ui/Modal';
import ConfirmDelete from '@ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import Empty from '@ui/Empty';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

const BookingDetail = () => {
    const { booking, isLoading } = useBooking();

    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    if (!booking) {
        return <Empty resource='booking' />;
    }

    if (isLoading) return <Spinner />;

    const { status, id: bookingId } = booking;

    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };
    const checkinClick = () => navigate(`/checkin/${bookingId}`);
    const checkoutClick = () => checkout(bookingId);
    const mutateOptions = { onSettled: () => navigate(-1) };
    const deleteConfirm = () => deleteBooking(bookingId, mutateOptions);

    return (
        <>
            <Row type='horizontal'>
                <HeadingGroup>
                    <Heading as='h1'>Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === 'unconfirmed' && (
                    <Button onClick={checkinClick}>Check In</Button>
                )}

                {status === 'checked-in' && (
                    <Button onClick={checkoutClick} disabled={isCheckingOut}>
                        Check Out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens='delete'>
                        <Button $variation='danger'>Delete booking</Button>
                    </Modal.Open>

                    <Modal.Window name='delete'>
                        <ConfirmDelete
                            resourceName='booking'
                            disabled={isDeleting}
                            onConfirm={deleteConfirm}
                        />
                    </Modal.Window>
                </Modal>

                <Button $variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
};

export default BookingDetail;
