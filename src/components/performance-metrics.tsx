import { onLCP, onINP, onCLS } from 'web-vitals';

export default function PerformanceMetrics() {
	onCLS(console.log);
	onINP(console.log);
	onLCP(console.log);

	return <></>;
}
