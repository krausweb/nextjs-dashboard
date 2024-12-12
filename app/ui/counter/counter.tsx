"use client";

import { useState } from "react";

import {
	decrement,
	increment,
	incrementAsync,
	incrementByAmount,
	incrementIfOdd,
	selectCount,
	selectStatus,
} from "@/app/lib/features/redux/official/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import styles from "./counter.module.css";

export const Counter = () => {
	const dispatch = useAppDispatch();
	const count = useAppSelector(selectCount);
	const status = useAppSelector(selectStatus);
	const [incrementAmount, setIncrementAmount] = useState("2");

	const incrementValue = Number(incrementAmount) || 0;

	return (
		<div className="mb-10">
			<h2 className="text-2xl font-bold my-4">Counter</h2>
			<div className={styles.row}>
				<button
					className={styles.button}
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
					-
				</button>
				<span aria-label="Count" className={styles.value}>
					{count}
				</span>
				<button
					className={styles.button}
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
				>
					+
				</button>
			</div>
			<div className={styles.row}>
				<input
					className={styles.textbox}
					aria-label="Set increment amount"
					value={incrementAmount}
					type="number"
					onChange={(e) => {
						setIncrementAmount(e.target.value);
					}}
				/>
				<button
					className={styles.button}
					onClick={() => dispatch(incrementByAmount(incrementValue))}
				>
					Add Amount
				</button>
				<button
					className={styles.asyncButton}
					disabled={status !== "idle"}
					onClick={() => dispatch(incrementAsync(incrementValue))}
				>
					Add Async
				</button>
				<button
					className={styles.button}
					onClick={() => {
						dispatch(incrementIfOdd(incrementValue));
					}}
				>
					Add If Odd
				</button>
			</div>
		</div>
	);
};
