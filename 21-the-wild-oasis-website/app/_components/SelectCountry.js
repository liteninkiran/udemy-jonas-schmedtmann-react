import { getCountries } from '@/app/_lib/data-service';

const SelectCountry = async ({ defaultCountry, name, id, className }) => {
    const countries = await getCountries();
    const findFn = (country) => country.name === defaultCountry;
    const flag = countries.find(findFn)?.flag ?? '';
    const mapFn = (c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
            {c.name}
        </option>
    );

    return (
        <select
            name={name}
            id={id}
            defaultValue={`${defaultCountry}%${flag}`}
            className={className}
        >
            <option value=''>Select Country...</option>
            {countries.map(mapFn)}
        </select>
    );
};

export default SelectCountry;
