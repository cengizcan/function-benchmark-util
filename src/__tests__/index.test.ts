import {
	benchmarkTimesWithThis,
	benchmarkWithThis,
	benchmark,
	benchmarkTimes,
	convertTimeToMilliseconds,
} from '../index';
import { generateRandomSeq, selectionSort, mergeSort } from '../../examples/lib';

describe('function-benchmark-util tests', () => {
	it('test benchmarkTimesWithThis', () => {
		const fn = () => {};
		fn.apply = jest.fn();
		const thisContext = { someParam: 'someValue' };
		benchmarkTimesWithThis(fn, 10, thisContext, [1, 2]);
		expect(fn.apply).toHaveBeenCalledTimes(10);
		expect(fn.apply).toHaveBeenCalledWith(thisContext, [1, 2]);
	});
	it('test benchmarkWithThis', () => {
		const fn = () => {};
		fn.apply = jest.fn();
		const thisContext = { someParam: 'someValue' };
		benchmarkWithThis(fn, thisContext, [1, 2]);
		expect(fn.apply).toHaveBeenCalledTimes(1);
		expect(fn.apply).toHaveBeenCalledWith(thisContext, [1, 2]);
	});
	it('test benchmark with real case', () => {
		const response = benchmark(selectionSort, [generateRandomSeq(10)]);
		expect(response.fnReturns).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		expect(response.functionName).toEqual('selectionSort');
		expect(response.runCount).toEqual(1);
		expect(response.average > 0).toBe(true);
		expect(response.average).toEqual(response.max);
		expect(response.average).toEqual(response.min);
	});
	it('test benchmarkTimes with real case', () => {
		const response = benchmarkTimes(mergeSort, 8, [generateRandomSeq(10)]);
		expect(response.fnReturns).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		expect(response.functionName).toEqual('mergeSort');
		expect(response.runCount).toEqual(8);
		expect(response.min > 0).toBe(true);
		expect(response.average >= response.min).toBe(true);
		expect(response.average <= response.max).toBe(true);
	});
	it('test microseconds to milliseconds conversion', () => {
		const response = convertTimeToMilliseconds(
			{ functionName: 'fnName', min: 0, average: 124.689, max: 12000, runCount: 987, fnReturns: 'return-value' },
			3,
		);
		expect(response.functionName).toEqual('fnName');
		expect(response.runCount).toEqual(987);
		expect(response.fnReturns).toEqual('return-value');
		expect(response.min).toEqual(0);
		expect(response.average).toEqual(0.125);
		expect(response.max).toEqual(12);
	});
});
