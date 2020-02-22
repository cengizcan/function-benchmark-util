import { benchmarkTimesWithThis, benchmarkWithThis, benchmark } from '../index';
import { generateRandomSeq, selectionSort } from '../../examples/lib';

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
    
    const response = benchmark(selectionSort, generateRandomSeq(10));
    expect(response.fnReturns).toEqual([[1,2,3,4,5,6,7,8,9,10]]);
    expect(response.functionName).toEqual('selectionSort');
    expect(response.runCount).toEqual(1);
    expect(response.average).toEqual(response.max);
    expect(response.average).toEqual(response.min);
  });
});