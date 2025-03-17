/**
 * @component QueryResultsTable
 *
 * QueryResultsTable component that renders the table for the data passed.
 * Handles data virtualization for large datasets.
 */
import { useRef } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import type { Column, TableConfig } from '@/constants/tables-config';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { getParamsFromQuery } from '@/lib/query';
import TableCellData from './table-cell-data';
import { FRACTION_WIDTH_CLASSES_MAP } from '@/constants/styles';

type Props = {
	tablesConfig: Record<string, TableConfig>;
	data: Record<string, any> | never[];
	query: string;
	isLoading: boolean;
};

export default function ({ tablesConfig, data = [], query, isLoading }: Props) {
	const { table } = getParamsFromQuery(query) || { table: '' };
	const columnsConfig: Column[] = tablesConfig[table].columns;
	const columns = columnsConfig.map((column: Column) => column.name);
	const columnsDetailsMap = columnsConfig.reduce<Record<string, Column>>((acc, column) => {
		acc[column.name] = {
			...column,
		};
		return acc;
	}, {});

	const listRef = useRef<HTMLDivElement | null>(null);

	const virtualizer = useWindowVirtualizer({
		count: data.length,
		estimateSize: () => 50,
		overscan: 5,
		scrollMargin: 40,
	});

	const virtualItems = virtualizer.getVirtualItems();

	return (
		<div ref={listRef} className='relative min-w-[1280px]'>
			<div>
				<div className='text-right' data-testid='table-rows-count'>
					Showing {data.length} rows
				</div>
				<Table
					style={{
						height: virtualizer.getTotalSize() + 40,
						width: '100%',
						position: 'relative',
					}}
				>
					<TableHeader>
						<TableRow data-testid='table-header-row' key='-1'>
							{columns.map((column: string, index: number) => (
								<TableHead
									className={FRACTION_WIDTH_CLASSES_MAP[columnsDetailsMap[column].width]}
									key={index}
								>
									{columnsDetailsMap[column].label}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
						}}
					>
						{virtualItems.map((virtualRow) => {
							const row = Array.isArray(data) ? data[virtualRow.index] : {};
							return (
								<TableRow
									data-index={row.id}
									key={row.id}
									ref={virtualizer.measureElement}
									style={{
										display: 'table',
										width: '100%',
										tableLayout: 'fixed',
									}}
								>
									{columns.map((column: string, columnIndex: number) => (
										<TableCell
											key={columnIndex}
											className={FRACTION_WIDTH_CLASSES_MAP[columnsDetailsMap[column].width]}
											data-testid='table-cell'
										>
											<TableCellData data={row[column]} type={columnsDetailsMap[column].type} />
										</TableCell>
									))}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
			{isLoading && (
				<div className='flex items-center justify-center h-screen'>
					<h2 className='bg-gray-500 text-white p-6 rounded-lg text-2xl'>Fetching Data</h2>
				</div>
			)}
		</div>
	);
}
