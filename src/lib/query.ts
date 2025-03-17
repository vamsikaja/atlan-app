/**
 * @lib
 *
 * This file contains the functions to validate and execute the SQL query
 * and return the data based on the query
 */
import type { Column, TableConfig } from '@/constants/tables-config';

const SIMPLE_SQL_VALIDATION_REGEX = /SELECT\s+(.+?)\s+FROM\s+(\w+)/i;
const SUPPORTED_TABLES = ['products', 'recipes', 'users', 'posts', 'todos'];

/**
 * Duplicate the data to show more rows in the UI
 *
 * @param data Record<string, any>[]
 * @returns Record<string, any>[]
 */
const _duplicateData = (data: Record<string, any>[]) => {
	const itemsCount = [100, 500, 1000, 5000, 10000];
	const duplicatedDataLength = itemsCount[Math.floor(Math.random() * itemsCount.length)];

	const duplicatedData = Array.from({ length: duplicatedDataLength });

	return duplicatedData.map((_, index) => {
		return { ...data[index % data.length], id: index + 1 };
	});
};

/**
 * Populates the data based on the columns. This is used to show only the selected columns
 * Also, duplicates the data to show more rows in the UI
 *
 * @param data Record<string, any>[]
 * @param columns columns: string[]
 * @returns Record<string, any>
 */
const __populateData = (data: Record<string, any>[], columns: string[]): Record<string, any> => {
	data = data.map((row: Record<string, any>) => {
		const newRow: Record<string, any> = {};
		columns.forEach((column: string) => {
			newRow[column] = row[column];
		});
		return newRow;
	});

	return _duplicateData(data);
};

/**
 * Takes a query and returns the columns and table name
 *
 * @param query string
 * @returns columns: string[], table: string | null
 */
const getParamsFromQuery = (query: string) => {
	const match = query.match(SIMPLE_SQL_VALIDATION_REGEX);
	if (match !== null && SUPPORTED_TABLES.includes(match[2].toLocaleLowerCase())) {
		return {
			columns: match[1].split(','),
			table: match[2],
		};
	} else {
		return null;
	}
};

/**
 * Fetches the data based on the query and returns the data to be shown in the table
 *
 * @param query string
 * @param tablesConfig Record<string, TableConfig>
 * @returns Record<string, any> | never[]
 */
const executeQuery = async (
	query: string,
	tablesConfig: Record<string, TableConfig>,
): Promise<Record<string, any> | never[]> => {
	let { table } = getParamsFromQuery(query) || { columns: [], table: '' };
	if (table) {
		const response = await fetch(`/data/${table}.json`);
		const dataJSON = await response.json();
		const data: Record<string, any>[] = dataJSON[table];
		const columns = tablesConfig[table].columns.map((column: Column) => column.name);
		return __populateData(data, columns);
	}
	return [];
};

export { SUPPORTED_TABLES, SIMPLE_SQL_VALIDATION_REGEX, getParamsFromQuery, executeQuery };
