const Stats = ({ items }) => {
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const pctPacked = (numPacked / numItems) * 100;
    const readyText = 'You got everything! Ready to go ✈️';
    const unreadyText = ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${pctPacked}%)`;
    const notStartedText = 'Start adding some items to your packing list 🚀';
    const startedText = pctPacked === 100 ? readyText : unreadyText;
    return (
        <footer className='stats'>
            <em>{items.length === 0 ? notStartedText : startedText}</em>
        </footer>
    );
};

export default Stats;
