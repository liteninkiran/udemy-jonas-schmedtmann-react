import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '@utils/helpers';

const Stats = ({ bookings, confirmedStays, availableNights }) => {
    const priceReducer = (acc, cur) => acc + cur.totalPrice;
    const nightsReducer = (acc, cur) => acc + cur.numNights;
    const occupation =
        confirmedStays.reduce(nightsReducer, 0) / availableNights;
    return (
        <>
            <Stat
                title='Bookings'
                color='blue'
                icon={<HiOutlineBriefcase />}
                value={bookings.length}
            />
            <Stat
                title='Sales'
                color='green'
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(bookings.reduce(priceReducer, 0))}
            />
            <Stat
                title='Check ins'
                color='indigo'
                icon={<HiOutlineCalendarDays />}
                value={confirmedStays.length}
            />
            <Stat
                title='Occupancy rate'
                color='yellow'
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + '%'}
            />
        </>
    );
};

export default Stats;
