/**
 * @component
 * Header component that displays the logo and navigation links
 */
import { Link } from '@tanstack/react-router';

import NavLink from './nav-link';

export default function Header() {
	return (
		<header className='flex justify-between items-center p-4' data-testid='header'>
			<Link to='/' className='block' data-testid='logo-link'>
				<img
					src='/images/logo.svg'
					alt='logo'
					className='aspect-3/1 w-[100px]'
					data-testid='logo-img'
				/>
			</Link>
			<nav data-testid='header-nav'>
				<ul className='flex gap-4'>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/query-builder'>Query Builder</NavLink>
				</ul>
			</nav>
		</header>
	);
}
