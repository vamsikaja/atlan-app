/**
 * @component
 * CustomQueryForm component that renders a form to input a custom query
 * and submit it to the data explorer
 * Handles:
 * - Pre-filling the form with a search query
 * - Query validation
 * - Error handling
 * - Form submission
 *
 * @param {string} searchQuery - The search query to pre-fill the form with
 * @param {Function} onSubmitQuery - The function to call when the form is submitted
 */
import { useRef, FormEvent, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { SUPPORTED_TABLES, getParamsFromQuery } from '@/lib/query';

type Props = {
	searchQuery: string | null;
	// eslint-disable-next-line no-unused-vars
	onSubmitQuery: (query: string) => void;
};

export default function CustomQueryForm({ onSubmitQuery, searchQuery }: Props) {
	const formRef = useRef<HTMLFormElement>(null);
	const supportedTables = SUPPORTED_TABLES;
	const [queryError, setQueryError] = useState<string | null>(null);

	const validateQuery = (query: string) => {
		return getParamsFromQuery(query) !== null;
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let isQueryValid = true;
		if (formRef.current?.checkValidity()) {
			const formData = new FormData(formRef.current);
			const query = formData.get('query');
			if (validateQuery(query as string)) {
				onSubmitQuery(query as string);
			} else {
				isQueryValid = false;
			}
		} else {
			isQueryValid = false;
		}
		setQueryError(isQueryValid ? null : 'Invalid query. Please check the query and try again.');
	};

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className='max-w-4xl mx-auto space-y-4 mb-4'
			data-testid='custom-query-form'
		>
			<div>
				<Label htmlFor='custom-query'>Query</Label>
				<Textarea
					className='font-bold placeholder:font-normal'
					required
					placeholder='Type your query here.'
					id='custom-query'
					name='query'
					data-testid='custom-query-field'
					defaultValue={searchQuery || ''}
					autoFocus={true}
				/>
				<p className='text-sm text-muted-foreground'>
					Supported Tables:&nbsp;
					{supportedTables.map((tableName, index) => (
						<code key={tableName}>
							{tableName}
							{index < supportedTables.length - 1 ? ', ' : ''}
						</code>
					))}
				</p>
				{queryError && (
					<p className='text-sm text-destructive-foreground' data-testid='custom-query-error'>
						{queryError}
					</p>
				)}
			</div>
			<div className='flex justify-end'>
				<Button variant='secondary' className='mr-2 cursor-pointer' type='reset'>
					Reset
				</Button>
				<Button type='submit' className='cursor-pointer'>
					Run Query
				</Button>
			</div>
		</form>
	);
}
