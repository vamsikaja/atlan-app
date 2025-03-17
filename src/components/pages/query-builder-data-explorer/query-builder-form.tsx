/**
 * @component QueryBuilderForm
 *
 * QueryBuilderForm component that renders a form to build a SQL query
 * and submit it to the QueryResultsTable component
 *
 * Handles:
 * - Showing columns based on selected table
 * - Selecting columns to include in the query
 * - Resetting the form
 * - Submitting the form
 */
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

import type { Column } from '@/constants/tables-config';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent } from '@/components/ui/card';

import TABLES_CONFIG from '@/constants/tables-config';

type Props = {
	// eslint-disable-next-line no-unused-vars
	onSubmitQuery: (query: string) => void;
};

export default function QueryBuilderForm({ onSubmitQuery }: Props) {
	const formRef = useRef<HTMLFormElement>(null);
	const supportedTables = Object.keys(TABLES_CONFIG);
	const tableNameColumnsMap = supportedTables.reduce<Record<string, Column[]>>((acc, tableName) => {
		acc[tableName] = TABLES_CONFIG[tableName].columns;
		return acc;
	}, {});
	const [query, setQuery] = useState<string | null>(null);
	const [tableColumns, setTableColumns] = useState<Column[]>([]);

	const [queryTable, setQueryTable] = useState<string>('');
	const [queryColumnsState, setQueryColumnsState] = useState<Record<string, boolean>>({});

	const onTableSelect = function (value: string) {
		let updatedColumns = tableNameColumnsMap[value];
		let updatedColumnsState = updatedColumns.reduce<Record<string, boolean>>((acc, column) => {
			acc[column.name] = true;
			return acc;
		}, {});

		setQueryColumnsState(updatedColumnsState);
		setTableColumns(tableNameColumnsMap[value]);
		setQueryTable(value);
	};

	const onColumnCheckChange = function (columnName: string, checked: boolean) {
		setQueryColumnsState((prevState) => ({
			...prevState,
			[columnName]: checked,
		}));
	};

	const onReset = function () {
		setQueryTable('');
		setTableColumns([]);
		setQueryColumnsState({});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formRef.current?.checkValidity()) {
			const formData = new FormData(formRef.current);
			const [queryTable, queryColumns] = [
				formData.get('query-table'),
				formData.getAll('query-columns'),
			];
			const queryColumnsString = queryColumns.length ? queryColumns.join(', ') : '*';
			const query = `SELECT ${queryColumnsString} FROM ${queryTable}`;
			setQuery(query);
			onSubmitQuery(query);
		}
	};

	return (
		<div className='max-w-4xl mx-auto mb-4'>
			<form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>
				<div className='flex gap-5'>
					<div className='flex-1'>
						<Label htmlFor='query-table'>Select Table</Label>
						<Select
							name='query-table'
							required
							value={queryTable}
							onValueChange={(value) => onTableSelect(value)}
						>
							<SelectTrigger id='query-table' className='w-[100%] capitalize'>
								<SelectValue placeholder='Select a table' />
							</SelectTrigger>
							<SelectContent>
								{supportedTables.map((tableName, index) => (
									<SelectItem value={tableName} className='capitalize' key={index}>
										{tableName}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='flex-1'>
						<fieldset>
							<Label>Select Table's Columns</Label>
							<div className='pt-2'>
								{tableColumns.length ? (
									<div className='flex gap-2 flex-wrap'>
										{tableColumns.map((column, index) => (
											<div key={index}>
												<Checkbox
													id={column.name}
													name='query-columns'
													value={column.name}
													checked={queryColumnsState[column.name] || false}
													onCheckedChange={(checked: boolean) =>
														onColumnCheckChange(column.name, checked)
													}
												/>
												<label className='ml-1' htmlFor={column.name}>
													{column.label}
												</label>
											</div>
										))}
									</div>
								) : (
									<p className='text-gray-500'>Select a table to view columns</p>
								)}
							</div>
						</fieldset>
					</div>
					<div></div>
				</div>
				<div className='flex justify-end gap-3'>
					<Button variant='secondary' className='cursor-pointer' onClick={onReset}>
						Reset
					</Button>
					<Button type='submit' className='cursor-pointer'>
						Run Query
					</Button>
				</div>
			</form>
			{query && (
				<Card className='mt-4'>
					<CardContent>
						<CardTitle>{query}</CardTitle>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
