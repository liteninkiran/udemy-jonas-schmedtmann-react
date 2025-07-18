import Heading from '../ui/Heading';
import Row from '../ui/Row';

const Account = () => {
    return (
        <>
            <Heading as='h1'>Update Your Account</Heading>

            <Row>
                <Heading as='h3'>Update user data</Heading>
                <p>Update user data form</p>
            </Row>

            <Row>
                <Heading as='h3'>Update password</Heading>
                <p>Update user password form</p>
            </Row>
        </>
    );
};

export default Account;
