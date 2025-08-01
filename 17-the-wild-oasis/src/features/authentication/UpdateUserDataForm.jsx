import { useState } from 'react';

import Button from '@ui/Button';
import FileInput from '@ui/FileInput';
import Form from '@ui/Form';
import FormRow from '@ui/FormRow';
import Input from '@ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

const UpdateUserDataForm = () => {
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName },
        },
    } = useUser();

    const { updateUser, isUpdating } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fullName) {
            return;
        }
        const data = { fullName, avatar };
        const onSuccess = () => {
            setAvatar(null);
            e.target.reset();
        };
        updateUser(data, { onSuccess });
    };

    const handleCancel = () => {
        setFullName(currentFullName);
        setAvatar(null);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label='Email address'>
                <Input value={email} disabled />
            </FormRow>
            <FormRow label='Full name'>
                <Input
                    type='text'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id='fullName'
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label='Avatar image'>
                <FileInput
                    id='avatar'
                    accept='image/*'
                    onChange={(e) => setAvatar(e.target.files[0])}
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow>
                <Button
                    type='reset'
                    $variation='secondary'
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button>Update account</Button>
            </FormRow>
        </Form>
    );
};

export default UpdateUserDataForm;
