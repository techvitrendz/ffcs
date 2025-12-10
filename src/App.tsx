import { useRef, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import TimeTable from "@/components/table/TimeTable";
import "./app.css";

function App() {
	const higherRef = useRef(null);

	// Consider screens smaller than this width as "small devices"
	const SMALL_SCREEN_WIDTH = 768; // px
	const [isSmall, setIsSmall] = useState(false);

	useEffect(() => {
		const check = () => {
			if (typeof window === "undefined") return;
			setIsSmall(window.innerWidth < SMALL_SCREEN_WIDTH);
		};

		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	// If small screen, render only the warning message (no popup) instead of the app content
	if (isSmall) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white p-6">
				<div className="max-w-lg text-center">
					<h1 className="text-2xl font-semibold mb-4">
						This website is best viewed on bigger devices
					</h1>
					<p className="text-base text-gray-700">
						This website is best viewed in bigger devices and not suitable for
						small devices, kindly use bigger screen
					</p>
				</div>
			</div>
		);
	}

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
