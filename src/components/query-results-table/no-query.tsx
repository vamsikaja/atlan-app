/**
 * @component NoQuery
 * NoQuery component that renders a message when no query is provided
 * or when the data is being fetched
 */
type Props = {
	isLoading: boolean;
};
export default function NoQuery({ isLoading }: Props) {
	return (
		<h2
			className='max-w-4xl mx-auto text-center text-2xl text-muted-foreground pt-5'
			data-testid='table-no-query'
		>
			{isLoading ? 'Fetching Data' : 'Add and Run Query to fetch the data'}
		</h2>
	);
}
