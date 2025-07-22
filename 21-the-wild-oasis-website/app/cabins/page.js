const Page = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const res = await fetch(url);
    const data = await res.json();
    return (
        <div>
            <h1>Cabins</h1>
            <ul>
                {data.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
