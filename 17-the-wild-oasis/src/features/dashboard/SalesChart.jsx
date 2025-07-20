import styled from 'styled-components';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

import Heading from '@ui/Heading';

import { fakeData, getColours } from './sales';
import useDarkMode from '../../context/useDarkMode';

const DashboardBox = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 3.2rem;

    display: flex;
    flex-direction: column;
    gap: 2.4rem;
`;

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

const SalesChart = ({ bookings, numDays }) => {
    const { isDarkMode } = useDarkMode();
    const colours = getColours(isDarkMode);
    const currency = '£';
    const axisTick = { fill: colours.text };
    const axisTickLine = { stroke: colours.text };
    const tooltipStyles = { backgroundColor: colours.background };

    const start = subDays(new Date(), numDays - 1);
    const end = new Date();
    const dateRange = { start, end };
    const allDates = eachDayOfInterval(dateRange);

    const salesFilterFn = (booking, date) =>
        isSameDay(date, new Date(booking.created_at));
    const totalSalesReducer = (acc, cur) => acc + cur.totalPrice;
    const extraSalesReducer = (acc, cur) => acc + cur.extrasPrice;

    const getSales = (date, reducer) =>
        bookings
            .filter((booking) => salesFilterFn(booking, date))
            .reduce(reducer, 0);

    const mapFn = (date) => ({
        label: format(date, 'MMM dd'),
        totalSales: getSales(date, totalSalesReducer),
        extrasSales: getSales(date, extraSalesReducer),
    });

    const data = allDates.map(mapFn);

    return (
        <StyledSalesChart>
            <Heading as='h2'>Sales</Heading>

            <ResponsiveContainer height={300} width='100%'>
                <AreaChart data={data}>
                    {/* X-Axis */}
                    <XAxis
                        dataKey='label'
                        tick={axisTick}
                        tickLine={axisTickLine}
                    />

                    {/* Y-Axis */}
                    <YAxis
                        unit={currency}
                        tick={axisTick}
                        tickLine={axisTickLine}
                    />

                    {/* Grid Lines */}
                    <CartesianGrid strokeDasharray='4' />

                    {/* Area 1 (Total Sales) */}
                    <Area
                        dataKey='totalSales'
                        type='monotone'
                        stroke={colours.totalSales.stroke}
                        fill={colours.totalSales.fill}
                        strokeWidth={2}
                        name='Total sales'
                        unit={currency}
                    />

                    {/* Area 2 (Extra Sales) */}
                    <Area
                        dataKey='extrasSales'
                        type='monotone'
                        stroke={colours.extrasSales.stroke}
                        fill={colours.extrasSales.fill}
                        strokeWidth={2}
                        name='Extras sales'
                        unit={currency}
                    />

                    {/* Tooltip */}
                    <Tooltip contentStyle={tooltipStyles} />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
};

export default SalesChart;
