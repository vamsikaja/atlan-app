/**
 * @component
 * Layout component that provides a header and main content area
 */
import Header from './header';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className='px-6 sm:px-8 lg:px-12 py-8' data-testid='main'>
				{children}
			</main>
		</>
	);
}
