interface BenchmarkResult {
	/**
	 * Executed functions name
	 */
	functionName: string;
	/**
	 * Execution count
	 */
	runCount: number;
	/**
	 * Minimum duration scored in  microseconds
	 */
	min: number;
	/**
	 * Maximum duration scored in  microseconds
	 */
	max: number;
	/**
	 * The average duration of all executions in  microseconds
	 */
	average: number;
	/**
	 * Return value of the latest execution
	 */
	fnReturns?: any;
}

/**
 * Benchmark a function only once with its parameters and sets this context to `null`.
 * @param fn - Function to benchmark
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmark(fn: any, params?: any[]): BenchmarkResult {
	return benchmarkTimesWithThis(fn, 1, null, params);
}

/**
 * Benchmark a function only once with its parameters and sets this context according to passed parameter.
 * @param fn - Function to benchmark
 * @param thisContext - this context for the function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmarkWithThis(fn: any, thisContext: object, params?: any[]): BenchmarkResult {
	return benchmarkTimesWithThis(fn, 1, thisContext, params);
}

/**
 * Benchmark a function multiple times with its parameters and sets this context to `null`.
 * @param fn - Function to benchmark
 * @param times - Times to execute function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmarkTimes(fn: any, times: number, params: any[]): BenchmarkResult {
	return benchmarkTimesWithThis(fn, times, undefined, params);
}

/**
 * Benchmark a function multiple times with its parameters and sets this context according to passed parameter.
 * @param fn - Function to benchmark
 * @param times - Times to execute function
 * @param thisContext - this context for the function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmarkTimesWithThis(fn: any, times: number, thisContext: object, params?: any[]): BenchmarkResult {
	let fnReturns: any;
	let total = 0;
	let max = 0;
	let min = Number.MAX_SAFE_INTEGER;
	for (let i = 1; i <= times; i++) {
		const start = tsInMicroseconds();

		const ret = fn.apply(thisContext, params);
		const duration = tsInMicroseconds() - start;
		total += duration;
		if (duration < min) min = duration;
		if (duration > max) max = duration;
		if (i === times) fnReturns = ret;
	}
	const result: BenchmarkResult = {
		functionName: fn.name,
		fnReturns,
		runCount: times,
		min,
		max,
		average: total / times,
	};
	return result;
}
/**
 * @ignore
 */
export function tsInMicroseconds(): number {
	let now: number;
	if (global?.process?.hrtime) {
		const hrt = process.hrtime();
		now = (1e9 * hrt[0] + hrt[1]) / 1e3;
	} else if (window?.performance?.now) {
		now = 1e3 * performance.now();
	} else {
		// tslint:disable-next-line: no-console
		console?.error('Benchmark time precision is in millisecons due to the unrecognized environment!');
		now = 1e3 * Date.now();
	}
	return now;
}
/**
 * @ignore
 */
function microToMilli(num: number, precision: number): number {
	return Math.round((num / 1e3) * Math.pow(10, precision)) / Math.pow(10, precision);
}
/**
 * Converts microsecond time values to milliseconds in a given `BenchmarkResult` object. Does not mutates the input.
 * @param benchmarkResult - Benchmark result object
 * @param precision - Precision digits. Default value is 2
 * @returns {BenchmarkResult}
 */
export function convertTimeToMilliseconds(benchmarkResult: BenchmarkResult, precision: number = 2): BenchmarkResult {
	return Object.assign({}, benchmarkResult, {
		min: microToMilli(benchmarkResult.min, precision),
		max: microToMilli(benchmarkResult.max, precision),
		average: microToMilli(benchmarkResult.average, precision),
	});
}
