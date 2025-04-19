'use client'

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/lib/features/redux/community/store";
import { increment, decrement, incrementByAmount, incrementAsync } from "@/app/lib/features/redux/community/counter/counterSlice";

function Counter() {
	const count = useSelector((state: RootState) => state.counter.value);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<section>
			<h2 className="dark:text-white">{count}</h2>
			<div className="grid grid-cols-4 gap-4">
				<button onClick={() => dispatch(increment())} className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
					Increment
				</button>
				<button onClick={() => dispatch(decrement())} className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
					Decrement
				</button>
				<button onClick={() => dispatch(incrementByAmount(5))} className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
					Increment By 5
				</button>
				<button onClick={() => dispatch(incrementAsync(20))} className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
					Increment Async
				</button>
			</div>
		</section>
	);
}

export default Counter;
