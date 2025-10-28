// function Footer() {
// 	return (
// 		<footer className="relative w-full mt-16">
// 			{/* Gradient Background */}
// 			<div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-90 difference"></div>
			
// 			{/* Content */}
// 			<div className="relative z-10 text-white py-12 px-8">
// 				{/* Main Footer Content */}
// 				<div className="max-w-6xl mx-auto">
// 					{/* VITrendZ Card */}
// 					<div className="flex justify-center mb-8">
// 						<div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
// 							<div className="flex items-center space-x-6">
// 								{/* Logo */}
// 								<div className="flex flex-col items-center">
// 									<div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-pink-400 to-white rounded-lg flex items-center justify-center mb-2">
// 										<span className="text-2xl font-bold text-black">V</span>
// 									</div>
// 									<span className="text-sm font-medium">VITrendZ</span>
// 								</div>
								
// 								{/* Connect Text */}
// 								<div>
// 									<h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
// 									<a 
// 										href="mailto:help@vitrendz.tech"
// 										className="text-lg underline hover:text-blue-300 transition-colors"
// 									>
// 										help@vitrendz.tech
// 									</a>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Services and Community */}
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// 						{/* Services */}
// 						<div>
// 							<h4 className="text-xl font-bold mb-4">Services</h4>
// 							<ul className="space-y-2">
// 								<li>
// 									<a 
// 										href="#" 
// 										className="text-white/80 hover:text-white transition-colors"
// 									>
// 										Student Feedback form
// 									</a>
// 								</li>
// 								<li>
// 									<a 
// 										href="#" 
// 										className="text-white/80 hover:text-white transition-colors"
// 									>
// 										Travel Mate
// 									</a>
// 								</li>
// 							</ul>
// 						</div>

// 						{/* Community */}
// 						<div>
// 							<h4 className="text-xl font-bold mb-4">Community</h4>
// 							<ul className="space-y-2">
// 								<li>
// 									<a 
// 										href="https://www.instagram.com/vitrendz/"
// 										target="_blank"
// 										rel="noreferrer noopener"
// 										className="text-white/80 hover:text-white transition-colors"
// 									>
// 										Instagram
// 									</a>
// 								</li>
// 								<li>
// 									<a 
// 										href="https://discord.gg/qXK5BrCy"
// 										target="_blank"
// 										rel="noreferrer noopener"
// 										className="text-white/80 hover:text-white transition-colors"
// 									>
// 										Discord
// 									</a>
// 								</li>
// 							</ul>
// 						</div>
// 					</div>

// 					{/* Copyright */}
// 					<div className="text-center text-white/60">
// 						<p>&copy;{new Date().getFullYear()} Made with 💙 by VITrendz</p>
// 					</div>
// 				</div>

// 				{/* Help Button */}
// 				<button className="absolute bottom-4 right-4 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center hover:bg-black/40 transition-colors">
// 					<span className="text-white text-xl">?</span>
// 				</button>
// 			</div>
// 		</footer>
// 	);
// }

// export default Footer;

function Footer() {
	return (
		<footer 
			className="relative w-full mt-16"
			style={{
				backgroundColor: 'var(--background)',
				color: 'var(--foreground)'
			}}
		>
			{/* Subtle gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10 dark:from-purple-600/5 dark:via-blue-600/5 dark:to-pink-600/5"></div>
			
			{/* Content */}
			<div className="relative z-10 py-12 px-8">
				{/* Main Footer Content */}
				<div className="max-w-6xl mx-auto">
					{/* VITrendZ Card */}
					<div className="flex justify-center mb-8">
						<div 
							className="backdrop-blur-sm rounded-2xl p-8 border"
							style={{
								backgroundColor: 'var(--card)',
								borderColor: 'var(--border)',
								color: 'var(--card-foreground)'
							}}
						>
							<div className="flex items-center space-x-6">
								{/* Logo */}
								<div className="flex flex-col items-center">
									<div 
										className="w-16 h-16 rounded-lg flex items-center justify-center mb-2"
										style={{
											backgroundColor: 'var(--primary)',
											color: 'var(--primary-foreground)'
										}}
									>
										<span className="text-2xl font-bold">V</span>
									</div>
									<span className="text-sm font-medium">VITrendZ</span>
								</div>
								
								{/* Connect Text */}
								<div>
									<h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
									<a 
										href="mailto:help@vitrendz.tech"
										className="text-lg underline transition-colors"
										style={{
											color: 'var(--primary)'
										}}
									>
										help@vitrendz.tech
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Services and Community */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						{/* Services */}
						<div>
							<h4 className="text-xl font-bold mb-4">Services</h4>
							<ul className="space-y-2">
								{['Student Feedback form', 'Travel Mate'].map((service) => (
									<li key={service}>
										<a 
											href="#" 
											className="transition-colors hover:opacity-80"
											style={{
												color: 'var(--muted-foreground)'
											}}
										>
											{service}
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* Community */}
						<div>
							<h4 className="text-xl font-bold mb-4">Community</h4>
							<ul className="space-y-2">
								{[
									{ name: 'Instagram', href: 'https://www.instagram.com/vitrendz/' },
									{ name: 'Discord', href: 'https://discord.gg/qXK5BrCy' }
								].map((link) => (
									<li key={link.name}>
										<a 
											href={link.href}
											target="_blank"
											rel="noreferrer noopener"
											className="transition-colors hover:opacity-80"
											style={{
												color: 'var(--muted-foreground)'
											}}
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Copyright */}
					<div style={{ color: 'var(--muted-foreground)' }}>
						<p>&copy;{new Date().getFullYear()} Made with 💙 by VITrendz</p>
					</div>
				</div>

				{/* Help Button */}
				<button 
					className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
					style={{
						backgroundColor: 'var(--accent)',
						borderColor: 'var(--border)',
						color: 'var(--accent-foreground)'
					}}
				>
					<span>?</span>
				</button>
			</div>
		</footer>
	);
}

export default Footer;