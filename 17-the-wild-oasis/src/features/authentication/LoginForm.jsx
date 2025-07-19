import { useState } from 'react';

import Button from '@ui/Button';
import Form from '@ui/Form';
import FormRowVertical from '@ui/FormRowVertical';
import Input from '@ui/Input';

import { useLogin } from './useLogin';
import SpinnerMini from '@ui/SpinnerMini';

const LoginForm = () => {
    const [email, setEmail] = useState('kiran@example.net');
    const [password, setPassword] = useState('password');
    const { login, isLoading } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        const credentials = { email, password };
        const options = {
            onSettled: () => {
                setEmail('');
                setPassword('');
            },
        };

        login(credentials, options);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label='Email address'>
                <Input
                    type='email'
                    id='email'
                    autoComplete='username'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label='Password'>
                <Input
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size='large'>
                    {!isLoading ? 'Log in' : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
};

export default LoginForm;
