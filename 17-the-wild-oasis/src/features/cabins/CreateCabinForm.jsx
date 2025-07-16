import { useForm } from 'react-hook-form';

import Button from '@ui/Button';
import Form from '@ui/Form';
import FormRow from '@ui/FormRow';
import FileInput from '@ui/FileInput';
import Input from '@ui/Input';
import Textarea from '@ui/Textarea';

import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

const CreateCabinForm = ({ cabin = {} }) => {
    const { id: editId, ...editValues } = cabin;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { isCreating, createCabin } = useCreateCabin();
    const { isUpdating, updateCabin } = useUpdateCabin();

    const isWorking = isCreating || isUpdating;

    const onFormSubmit = (data) => {
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];
        const cabin = { ...data, image: image };

        const onSuccess = (data) => reset();

        if (isEditSession) {
            updateCabin({ cabin, id: editId }, { onSuccess });
        } else {
            createCabin(cabin, { onSuccess });
        }
    };
    const onFormError = (errors) => {
        // console.log(errors);
    };
    const required = {
        required: 'This field is required',
    };
    const minCapacity = {
        min: {
            value: 1,
            message: 'Capacity should be at least 1',
        },
    };
    const minPrice = {
        min: {
            value: 1,
            message: 'Price should be at least 1',
        },
    };
    const maxDiscount = {
        validate: (value) =>
            value <= getValues().regularPrice ||
            'Discount should be less than the Regular Price',
    };

    return (
        <Form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
            <FormRow label='Cabin Name' error={errors?.name?.message}>
                <Input
                    type='text'
                    id='name'
                    disabled={isWorking}
                    {...register('name', required)}
                />
            </FormRow>

            <FormRow
                label='Maximum Capacity'
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type='number'
                    id='maxCapacity'
                    disabled={isWorking}
                    {...register('maxCapacity', {
                        ...required,
                        ...minCapacity,
                    })}
                />
            </FormRow>

            <FormRow
                label='Regular Price'
                error={errors?.regularPrice?.message}
            >
                <Input
                    type='number'
                    id='regularPrice'
                    disabled={isWorking}
                    {...register('regularPrice', {
                        ...required,
                        ...minPrice,
                    })}
                />
            </FormRow>

            <FormRow label='Discount' error={errors?.discount?.message}>
                <Input
                    type='number'
                    id='discount'
                    disabled={isWorking}
                    defaultValue={0}
                    {...register('discount', {
                        ...required,
                        ...maxDiscount,
                    })}
                />
            </FormRow>

            <FormRow
                label='Description for Website'
                error={errors?.description?.message}
            >
                <Textarea
                    type='number'
                    id='description'
                    disabled={isWorking}
                    defaultValue=''
                    {...register('description', required)}
                />
            </FormRow>

            <FormRow label='Cabin Photo' error={errors?.image?.message}>
                <FileInput
                    id='image'
                    accept='image/*'
                    disabled={isWorking}
                    {...register('image', {
                        required: isEditSession ? false : required.required,
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute */}
                <Button $variation='secondary' type='reset'>
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? 'Update Cabin' : 'Create New Cabin'}
                </Button>
            </FormRow>
        </Form>
    );
};

export default CreateCabinForm;
