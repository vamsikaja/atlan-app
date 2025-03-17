/**
 * @component
 * CustomQueryDataExplorer component that renders a custom query form and a query results table
 *
 * @param {string} searchQuery - The search query to pre-fill the form with
 */
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import CustomQueryForm from './custom-query-form';
import QueryResultsTable from '@/components/query-results-table';

import TablesConfig from '@/constants/tables-config';

export default function CustomQueryDataExplorer({ searchQuery }: { searchQuery: string }) {
	const navigate = useNavigate({
		from: '/',
	});
	const [query, setQuery] = useState<string | null>(searchQuery || null);
	const tablesConfig = TablesConfig;

	const onSubmitQuery = (query: string) => {
		navigate({
			search: {
				query,
			},
		});
		setQuery(query);
	};

	return (
		<>
			<CustomQueryForm searchQuery={searchQuery} onSubmitQuery={onSubmitQuery} />
			<QueryResultsTable query={query} tablesConfig={tablesConfig} />
		</>
	);
}
