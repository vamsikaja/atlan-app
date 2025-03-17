/**
 * @route /query-builder
 * Query Builder route
 */

import { createFileRoute } from '@tanstack/react-router';

import QueryBuilderDataExplorer from '@/components/pages/query-builder-data-explorer';

export const Route = createFileRoute('/query-builder')({
	component: QueryBuilderDataExplorer,
});
