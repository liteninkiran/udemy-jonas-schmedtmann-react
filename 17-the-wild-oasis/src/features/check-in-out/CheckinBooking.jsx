import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@ui/Button';
import ButtonGroup from '@ui/ButtonGroup';
import ButtonText from '@ui/ButtonText';
import Checkbox from '@ui/Checkbox';
import Heading from '@ui/Heading';
import Row from '@ui/Row';
import Spinner from '@ui/Spinner';

import BookingDataBox from '@features/bookings/BookingDataBox';
import { useBooking } from '@features/bookings/useBooking';
import { useSettings } from '@features/settings/useSettings';

import { useMoveBack } from '@hooks/useMoveBack';
import { formatCurrency } from '@utils/helpers';
import { useCheckin } from './useCheckin';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const moveBack = useMoveBack();
    const { booking, isLoading } = useBooking();
    const { checkin, isCheckingIn } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    const effectFn = () => {
        setConfirmPaid(booking?.isPaid ?? false);
    };

    useEffect(effectFn, [booking]);

    if (isLoading || isLoadingSettings) {
        return <Spinner />;
    }

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const breakfastPrice = settings.breakfastPrice * numNights * numGuests;

    const prices = {
        total: totalPrice + breakfastPrice,
        part1: totalPrice,
        part2: breakfastPrice,
    };

    const formatted = {
        total: formatCurrency(prices.total),
        part1: formatCurrency(prices.part1),
        part2: formatCurrency(prices.part2),
    };

    const handleCheckin = () => {
        if (!confirmPaid) {
            return;
        }
        const checkinOptions = {
            bookingId,
            breakfast: addBreakfast
                ? {
                      hasBreakfast: true,
                      extrasPrice: breakfastPrice,
                      totalPrice: prices.total,
                  }
                : {},
        };
        checkin(checkinOptions);
    };

    const handleAddBreakfast = () => {
        setAddBreakfast((value) => !value);
        setConfirmPaid(false);
    };

    const breakdown = `${formatted.total} (${formatted.part1} + ${formatted.part2})`;
    const grandTotal = !addBreakfast ? formatCurrency(totalPrice) : breakdown;

    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        id='breakfast'
                        checked={addBreakfast}
                        onChange={handleAddBreakfast}
                    >
                        Want to add breakfast for{' '}
                        {formatCurrency(breakfastPrice)}?
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    id='confirm'
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((value) => !value)}
                    disabled={confirmPaid || isCheckingIn}
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of {grandTotal}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button $variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
};

export default CheckinBooking;
