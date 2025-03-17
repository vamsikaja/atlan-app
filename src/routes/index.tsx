/**
 * @route /
 * Index route
 */

import { createFileRoute, useSearch } from '@tanstack/react-router';

import CustomQueryDataExplorer from '@/components/pages/custom-query-data-explorer';

/**
 * @component
 * Index route component that renders the CustomQueryDataExplorer component
 * and passes the search query as a prop
 */
function useQueryParams() {
	const search = useSearch({
		from: '/',
	});

	const query = search?.query;

	return (
		<>
			<CustomQueryDataExplorer searchQuery={query} />
		</>
	);
}

export const Route = createFileRoute('/')({
	component: useQueryParams,
});
