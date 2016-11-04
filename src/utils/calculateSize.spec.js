import { calculateSize } from './calculateSize';

describe('calculateSize', () => {
	it('should return size based on duration', () => {
		expect(calculateSize(1500)).toEqual(75);
	});
	it('should return min 20', () => {
		expect(calculateSize(1)).toEqual(20);
	});
	it('should return max 120', () => {
		expect(calculateSize(999999)).toEqual(120);
	});
});
