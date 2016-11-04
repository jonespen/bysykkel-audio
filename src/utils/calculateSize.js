const min = 20;
const max = 120;

export function calculateSize(duration){
	const size = duration / 2000 * 100;
	return Math.max(Math.min(size, max), min);
}
