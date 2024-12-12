import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 5,
}

const counterSlice = createSlice({
	// there is the name conflict with Official and Community counter example
	// so, it needs to be like "counterCommunity" and the Store reducer object too
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.pending, () => {
				console.log("incrementAsync pending");
			})
			.addCase(
				incrementAsync.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.value += action.payload;
				}
			);
	},
});

export const incrementAsync = createAsyncThunk(
	"counter/incrementAsync",
	async (amount: number) => {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an async action
		return amount;
	}
)

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
