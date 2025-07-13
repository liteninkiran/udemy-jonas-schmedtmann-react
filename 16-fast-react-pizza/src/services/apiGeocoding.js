const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const getAddress = async ({ latitude, longitude }) => {
    const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}`;
    const res = await fetch(url);
    if (!res.ok) throw Error('Failed getting address');
    const data = await res.json();
    return data;
};
