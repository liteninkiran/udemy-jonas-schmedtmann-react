import { useForm } from 'react-hook-form';

import Button from '@ui/Button';
import Form from '@ui/Form';
import FormRow from '@ui/FormRow';
import Input from '@ui/Input';

const required = {
    required: 'This field is required',
};

const SignupForm = () => {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const inputs = [
        {
            id: 'fullName',
            label: 'Full Name',
            type: 'text',
            validation: required,
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            validation: {
                ...required,
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please provide a valid email address',
                },
            },
        },
        {
            id: 'password',
            label: 'Password (min 8 characters)',
            type: 'password',
            validation: {
                ...required,
                minLength: {
                    value: 8,
                    message: 'Password needs a minimum of 8 characters',
                },
            },
        },
        {
            id: 'passwordConfirm',
            label: 'Confirm password',
            type: 'password',
            validation: {
                ...required,
                validate: (value) =>
                    value === getValues().password || 'Passwords need to match',
            },
        },
    ];

    const onSubmit = ({ fullName, email, password }) => {};

    const mapFn = (input) => (
        <FormRow
            label={input.label}
            error={errors?.[input.id]?.message}
            key={input.id}
        >
            <Input
                type={input.type}
                id={input.id}
                {...register(input.id, input.validation)}
            />
        </FormRow>
    );

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {inputs.map(mapFn)}

            <FormRow>
                <Button $variation='secondary' type='reset'>
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
};

export default SignupForm;
