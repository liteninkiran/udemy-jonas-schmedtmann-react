import styled from 'styled-components';

import Input from '@ui/Input';
import Form from '@ui/Form';
import Button from '@ui/Button';
import FileInput from '@ui/FileInput';
import Textarea from '@ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '@services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '@ui/FormRow';

const CreateCabinForm = () => {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;
    const queryClient = useQueryClient();
    const onMutationSuccess = () => {
        toast.success('New cabin successfully created');
        queryClient.invalidateQueries({ queryKey: ['cabins'] });
        reset();
    };
    const onMutationError = (err) => toast.error(err.message);
    const mutation = {
        mutationFn: createCabin,
        onSuccess: onMutationSuccess,
        onError: onMutationError,
    };
    const { mutate, isPending: isCreating } = useMutation(mutation);

    const onFormSubmit = (data) => {
        mutate(data);
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
                    defaultValue=''
                    {...register('description', required)}
                />
            </FormRow>

            <FormRow label='Cabin Photo' error={errors?.image?.message}>
                <FileInput id='image' accept='image/*' disabled={isCreating} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute */}
                <Button $variation='secondary' type='reset'>
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
};

export default CreateCabinForm;
