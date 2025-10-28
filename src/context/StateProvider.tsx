import { createContext, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";

// Define the shape of your state context value
interface StateContextValue<TState, TAction> {
	state: TState;
	dispatch: Dispatch<TAction>;
}

// Create the context with proper typing
export const StateContext = createContext<
	StateContextValue<any, any> | undefined
>(undefined);

// Define props interface for StateProvider
interface StateProviderProps<TState, TAction> {
	reducer: (state: TState, action: TAction) => TState;
	initialState: TState;
	children: ReactNode;
}

// StateProvider component with generic types
export const StateProvider = <TState, TAction>({
	reducer,
	initialState,
	children,
}: StateProviderProps<TState, TAction>) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
};

// Custom hook with proper typing and error handling
export const useStateValue = <TState, TAction>(): StateContextValue<
	TState,
	TAction
> => {
	const context = useContext(StateContext);

	if (context === undefined) {
		throw new Error("useStateValue must be used within a StateProvider");
	}

	return context as StateContextValue<TState, TAction>;
};
