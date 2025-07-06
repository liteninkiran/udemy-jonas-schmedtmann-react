import { connect } from 'react-redux';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

const BalanceDisplay = ({ balance }) => {
    return <div className='balance'>{formatCurrency(balance)}</div>;
};

const mapStateToProps = (state) => ({
    balance: state.account.balance,
});

export default connect(mapStateToProps)(BalanceDisplay);
