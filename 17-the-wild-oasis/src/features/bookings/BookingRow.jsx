import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
    HiArrowDownOnSquare as CheckinIcon,
    HiArrowUpOnSquare as CheckoutIcon,
    HiEye,
    HiTrash,
} from 'react-icons/hi2';

import Tag from '@ui/Tag';
import Table from '@ui/Table';
import Modal from '@ui/Modal';
import Menus from '@ui/Menus';
import ConfirmDelete from '@ui/ConfirmDelete';

import { formatCurrency } from '@utils/helpers';
import { formatDistanceFromNow } from '@utils/helpers';
import { useCheckout } from '@features/check-in-out/useCheckout';

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
`;

const BookingRow = ({
    booking: {
        id: bookingId,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    },
}) => {
    const navigate = useNavigate();
    const { checkout, isCheckingOut } = useCheckout();
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    const detailsClick = () => navigate(`/bookings/${bookingId}`);
    const checkinClick = () => navigate(`/checkin/${bookingId}`);
    const checkoutClick = () => checkout(bookingId);
    const deleteClick = () => {};

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? 'Today'
                        : formatDistanceFromNow(startDate)}{' '}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), 'dd MMM yyyy')} &mdash;{' '}
                    {format(new Date(endDate), 'dd MMM yyyy')}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        {/* Show Details */}
                        <Menus.Button icon={<HiEye />} onClick={detailsClick}>
                            Show Details
                        </Menus.Button>

                        {/* Check In */}
                        {status === 'unconfirmed' && (
                            <Menus.Button
                                icon={<CheckinIcon />}
                                onClick={checkinClick}
                            >
                                Check In
                            </Menus.Button>
                        )}

                        {/* Check Out */}
                        {status === 'checked-in' && (
                            <Menus.Button
                                icon={<CheckoutIcon />}
                                onClick={checkoutClick}
                                disabled={isCheckingOut}
                            >
                                Check Out
                            </Menus.Button>
                        )}

                        {/* Delete */}
                        <Modal.Open opens='delete'>
                            <Menus.Button
                                icon={<HiTrash />}
                                onClick={deleteClick}
                            >
                                Delete Booking
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name='delete'>
                    <ConfirmDelete resourceName='booking' />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
};

export default BookingRow;
