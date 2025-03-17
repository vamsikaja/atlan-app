/**
 * @component
 * NavLink component that renders a Link component with a custom style
 */
import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

type NavLinkProps = {
	to: string;
	children: ReactNode;
};

export default function NavLink({ to, children }: NavLinkProps) {
	return (
		<Link
			to={to}
			data-testid={`nav-link-${to}`}
			className='hover:text-blue-500 [.active]:font-semibold'
		>
			{children}
		</Link>
	);
}
