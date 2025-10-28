export default function About() {
	return (
		<div className="flex p-5 items-center justify-center mt-20 mb-20">
			<div className="max-w-[50%] p-10 text-center mt-10 customShadowDark rounded-lg bg-blue-100 dark:bg-gray-800">
				<h1 className="text-2xl font-bold mb-10">About App</h1>
				<p className="mb-5">
					Since, there was no course allocation pdf this time, we had to scrape
					the data using{" "}
					<a
						href="https://www.linkedin.com/in/vishruthdevan/"
						rel="noopener noreferrer"
						target="_blank"
						className="text-blue-500"
					>
						Vishruth Devan&apos;s
					</a>{" "}
					script and could fetch only data of{" "}
					<strong>
						{" "}
						CSE Core, CSE Blockchain, CSE Data Science, IT, EEE, Chem{" "}
					</strong>
					branches only. Other branches are requested to use the Customized
					Course Addition Feature.
				</p>
				<p>
					VITrends FFCS Planner is the most unique FFCS planner that a VITian
					has ever seen with novelties like automatic timetable generation,
					customized course addition and rest of the generic FFCS
					functionalities.
				</p>
			</div>
		</div>
	);
}
