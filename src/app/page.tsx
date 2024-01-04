// MODULES IMPORT
import { Metadata } from 'next';

// PAGE NAME
export const metadata: Metadata = {
    title: 'Home',
}

// PAGE COMPONENT
export default function Home(): JSX.Element {
    return (
        <div className="home">
            <p>Bookkeeper</p>
            <p>Bookkeeper</p>
        </div>
    )
}