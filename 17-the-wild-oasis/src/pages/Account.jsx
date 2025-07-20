import UpdateUserDataForm from '@features/authentication/UpdateUserDataForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import UpdatePasswordForm from '@features/authentication/UpdatePasswordForm';

const Account = () => {
    return (
        <>
            <Heading as='h1'>Update Your Account</Heading>

            <Row>
                <Heading as='h3'>Update user data</Heading>
                <UpdateUserDataForm />
            </Row>

            <Row>
                <Heading as='h3'>Update password</Heading>
                <UpdatePasswordForm />
            </Row>
        </>
    );
};

export default Account;
