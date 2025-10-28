import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StateProvider } from "./context/StateProvider.tsx";
import { initialState } from "./context/reducer.ts";
import reducer from "./context/reducer.ts";

createRoot(document.getElementById("root")!).render(
	<StateProvider initialState={initialState} reducer={reducer}>
		<App />
	</StateProvider>
);
