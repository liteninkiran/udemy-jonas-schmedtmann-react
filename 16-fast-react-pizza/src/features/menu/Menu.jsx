import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';

const Menu = () => {
    const menu = useLoaderData();
    const mapFn = (pizza) => <MenuItem pizza={pizza} key={pizza.id} />;
    const className = 'divide-y divide-stone-200 px-2';
    return <ul className={className}>{menu.map(mapFn)}</ul>;
};

export default Menu;
