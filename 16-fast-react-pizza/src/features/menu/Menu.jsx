import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';

const Menu = () => {
    const menu = useLoaderData();
    const mapFn = (pizza) => <MenuItem pizza={pizza} key={pizza.id} />;
    return <ul>{menu.map(mapFn)}</ul>;
};

export default Menu;
