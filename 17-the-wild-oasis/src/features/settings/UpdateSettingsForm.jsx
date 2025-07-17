import Form from '@ui/Form';
import FormRow from '@ui/FormRow';
import Input from '@ui/Input';
import Spinner from '@ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

const UpdateSettingsForm = () => {
    const { isLoading, settings } = useSettings();
    const { isUpdating, updateSetting } = useUpdateSetting();

    if (isLoading) return <Spinner />;

    const handleUpdate = (e, field) => {
        const { value } = e.target;
        if (!value) {
            return;
        }
        updateSetting({ [field]: value });
    };

    const inputs = [
        {
            label: 'Minimum nights/booking',
            defaultValue: 'minBookingLength',
            id: 'min-nights',
            field: 'minBookingLength',
        },
        {
            label: 'Maximum nights/booking',
            defaultValue: 'maxBookingLength',
            id: 'max-nights',
            field: 'maxBookingLength',
        },
        {
            label: 'Maximum guests/booking',
            defaultValue: 'maxGuestsPerBooking',
            id: 'max-guests',
            field: 'maxGuestsPerBooking',
        },
        {
            label: 'Breakfast price',
            defaultValue: 'breakfastPrice',
            id: 'breakfast-price',
            field: 'breakfastPrice',
        },
    ];

    const mapFn = (input) => (
        <FormRow label={input.label} key={`${input.id}-label`}>
            <Input
                type='number'
                id={input.id}
                defaultValue={settings[input.defaultValue]}
                disabled={isUpdating}
                onBlur={(e) => handleUpdate(e, input.field)}
                key={`${input.id}-input`}
            />
        </FormRow>
    );

    return <Form>{inputs.map(mapFn)}</Form>;
};

export default UpdateSettingsForm;
