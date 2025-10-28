import type { ReactNode } from "react";

interface SimpleButtonProps {
	children: ReactNode;
}

export default function SimpleButton({ children }: SimpleButtonProps) {
	return (
		<button
			type="button"
			className="px-1 py-1 rounded-md bg-transparent text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
		>
			{children}
		</button>
	);
}
