import { useRef } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import TimeTable from "@/components/table/TimeTable";

import "./app.css";

function App() {
	const higherRef = useRef(null);

	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<div className="min-h-screen bg-gradient-to-br from-pink-500/20 via-transparent to-blue-500/20">
				{/* Timetable Component */}
				{/* <ModeToggle /> */}
				<TimeTable higherRef={higherRef} />
			</div>
			<Analytics />
		</ThemeProvider>
	);
}

export default App;
