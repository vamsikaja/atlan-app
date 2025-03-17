/**
 * @component QueryBuilderDataExplorer
 *
 * QueryBuilderDataExplorer component that renders the QueryBuilderForm and QueryResultsTable components
 */

import { useState } from 'react';

import QueryBuilderForm from './query-builder-form';
import QueryResultsTable from '@/components/query-results-table';

import TABLES_CONFIG from '@/constants/tables-config';

export default function QueryBuilderDataExplorer() {
	let [query, setQuery] = useState<string | null>(null);
	let tablesConfig = TABLES_CONFIG;

	const onSubmitQuery = (query: string) => {
		setQuery(query);
	};

	return (
		<>
			<QueryBuilderForm onSubmitQuery={onSubmitQuery} />
			<QueryResultsTable query={query} tablesConfig={tablesConfig} />
		</>
	);
}
