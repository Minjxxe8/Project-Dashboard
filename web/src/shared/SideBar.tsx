import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <aside className="h-screen fixed w-[200px] bg-gray-800 text-white p-5">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link to="/jars" className="hover:text-gray-400">Jar Page</Link>
                    </li>
                    <li>
                        <Link to="/reviews" className="hover:text-gray-400">Reviews Page</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="hover:text-gray-400">Project Page</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar;