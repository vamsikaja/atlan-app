/**
 * @constants
 *
 * Has data and type constants for the tables used in the app
 */
type Column = {
	name: string;
	label: string;
	type: string;
	width: string;
};

type TableConfig = {
	columns: Column[];
};

const TABLES_CONFIG: Record<string, TableConfig> = {
	products: {
		columns: [
			{
				name: 'id',
				label: 'ID',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'title',
				label: 'Title',
				type: 'string',
				width: '3/12',
			},
			{
				name: 'price',
				label: 'Price',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'description',
				label: 'Description',
				type: 'string',
				width: '4/12',
			},
			{
				name: 'category',
				label: 'Category',
				type: 'string',
				width: '2/12',
			},
			{
				name: 'rating',
				label: 'Rating',
				type: 'number',
				width: '1/12',
			},
		],
	},
	recipes: {
		columns: [
			{
				name: 'id',
				label: 'ID',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'name',
				label: 'Name',
				type: 'string',
				width: '2/12',
			},
			{
				name: 'ingredients',
				label: 'Ingredients',
				type: 'array',
				width: '3/12',
			},
			{
				name: 'instructions',
				label: 'Instructions',
				type: 'array',
				width: '4/12',
			},
			{
				name: 'prepTimeMinutes',
				label: 'Prep Time (minutes)',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'cookTimeMinutes',
				label: 'Cook Time (minutes)',
				type: 'number',
				width: '1/12',
			},
		],
	},
	users: {
		columns: [
			{
				name: 'id',
				label: 'ID',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'firstName',
				label: 'First Name',
				type: 'string',
				width: '2/12',
			},
			{
				name: 'lastName',
				label: 'Last Name',
				type: 'string',
				width: '2/12',
			},
			{
				name: 'age',
				label: 'Age',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'email',
				label: 'Email',
				type: 'string',
				width: '2/12',
			},
			{
				name: 'phone',
				label: 'Phone',
				type: 'string',
				width: '2/12',
			},
			{
				name: 'image',
				label: 'Image',
				type: 'image',
				width: '2/12',
			},
		],
	},
	posts: {
		columns: [
			{
				name: 'id',
				label: 'ID',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'title',
				label: 'Title',
				type: 'string',
				width: '4/12',
			},
			{
				name: 'body',
				label: 'Body',
				type: 'string',
				width: '5/12',
			},
			{
				name: 'views',
				label: 'Views',
				type: 'number',
				width: '2/12',
			},
		],
	},
	todos: {
		columns: [
			{
				name: 'id',
				label: 'ID',
				type: 'number',
				width: '1/12',
			},
			{
				name: 'todo',
				label: 'Todo',
				type: 'string',
				width: '10/12',
			},
			{
				name: 'completed',
				label: 'Completed',
				type: 'boolean',
				width: '1/12',
			},
		],
	},
};

export default TABLES_CONFIG;

export type { TableConfig, Column };
