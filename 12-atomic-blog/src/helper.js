import { faker } from '@faker-js/faker';

export const createRandomPost = () => ({
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
});
