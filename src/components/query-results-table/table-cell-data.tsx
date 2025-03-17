/**
 * @component TableCellData
 * Component that renders the data for a table cell based on the type of data
 */
type Props = {
	data: string | number | string[] | boolean;
	type: string;
};

export default function TableCellData({ data, type }: Props) {
	switch (type) {
		case 'array':
			return (
				<ol className='list-decimal'>
					{(data as string[]).map((item: any, index: number) => (
						<li key={index}>{item}</li>
					))}
				</ol>
			);
		case 'image':
			return (
				<div className='border-2 inline-block'>
					<img src={typeof data === 'string' ? data : ''} className='w-auto h-[100px]' />
				</div>
			);
		case 'boolean':
			return <div>{data ? 'Yes' : 'No'}</div>;
		default:
			return <div>{data}</div>;
	}
}
