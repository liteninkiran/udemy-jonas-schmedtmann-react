import { content } from './data';
import Tabbed from './components/Tabbed';

export default function App() {
    return (
        <div>
            <Tabbed content={content} />
        </div>
    );
}
