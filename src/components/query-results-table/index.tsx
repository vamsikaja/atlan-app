/**
 * @component QueryResultsTable
 * QueryResultsTable component that renders the query results table
 * based on the query and tablesConfig passed as props
 *
 * Handles:
 * - Fetching query results based on the query
 * - Rendering the table based on the query results
 * - Showing a message when no query is provided
 */
import { useEffect, useState } from 'react';

import { executeQuery } from '@/lib/query';
import type { TableConfig } from '@/constants/tables-config';
import Table from './table';
import NoQuery from './no-query';

export default function ({
	query,
	tablesConfig,
}: {
	query: string | null;
	tablesConfig: Record<string, TableConfig>;
}) {
	let [data, setData] = useState<Record<string, any> | never[]>([]);
	let [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchResults = async (query: string) => {
		setIsLoading(true);
		let results = await executeQuery(query, tablesConfig);
		setData(results);
		setIsLoading(false);
	};

	useEffect(() => {
		if (query) {
			fetchResults(query);
		}
	}, [query]);

	return (
		<>
			{query ? (
				<Table tablesConfig={tablesConfig} data={data} query={query} isLoading={isLoading} />
			) : (
				<NoQuery isLoading={isLoading} />
			)}
		</>
	);
}
