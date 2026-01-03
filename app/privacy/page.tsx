import React from "react";

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-black text-white pt-[80px] lg:pt-[130px] pb-20">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Privacy Policy
					</h1>
					<p className="text-gray-400 text-sm">
						Last Updated: 19 November, 2025
					</p>
				</div>

				{/* Content Sections */}
				<div className="space-y-8">
					{/* Introduction */}
					<section>
						<h2 className="text-2xl font-bold mb-4">Introduction</h2>
						<p className="text-gray-300 leading-relaxed">
							Welcome to TryOn360.today, the future of personal styling and
							beauty discovery. We are your dedicated AI-powered assistant
							committed to helping you find the perfect look tailored
							specifically to you.
						</p>
					</section>
					<div className="border-t border-[#4B4B4B]"></div>

					{/* Information We Collect */}
					<section>
						<h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
						<p className="text-gray-300 leading-relaxed mb-4">
							We collect two types of information:
						</p>
						<div className="space-y-3 text-gray-300">
							<p>(a) Information you provide and</p>
							<p>(b) Information automatically collected through usage.</p>
							<p className="mt-4 leading-relaxed">
								<span className="font-semibold">
									User Provided Information:
								</span>{" "}
								This includes your email address (if you choose to subscribe)
								and any feedback or support requests you send us.
							</p>
							<p className="leading-relaxed">
								<span className="font-semibold">
									Automatically Collected Information:
								</span>{" "}
								This includes anonymous usage data such as features accessed, time
								spent in the app, detail crash reports. This data is used to
								improve app performance and user experience.
							</p>
						</div>
					</section>
					<div className="border-t border-[#4B4B4B]"></div>

					{/* User Photos and AI Processing */}
					<section>
						<h2 className="text-2xl font-bold mb-4">
							User Photos and AI Processing
						</h2>
						<p className="text-gray-300 leading-relaxed mb-4">
							This is the most critical part of our policy given TryOn360&apos;s
							features (Hair Style, Hair Color, Beard generation).
						</p>
						<p className="text-gray-300 leading-relaxed mb-4">
							<span className="font-semibold">NO Permanent Storage:</span> Your
							uploaded photos are processed temporarily on our secure servers
							solely to generate the &quot;Try-On&quot; results you request. We{" "}
							<span className="font-semibold">DO NOT permanently</span> store
							your submitted images on our servers.
						</p>
						<p className="text-gray-300 leading-relaxed mb-4">
							<span className="font-semibold">Data in Transit:</span> Photos are
							immediately deleted from our servers once the processed result is
							returned to your device or the session ends.
						</p>
						<p className="text-gray-300 leading-relaxed">
							<span className="font-semibold">NO AI Training:</span> Your
							personal photos are <span className="font-semibold">NEVER</span>{" "}
							used to train our AI models or shared with any third party for
							marketing purposes.
						</p>
					</section>
					<div className="border-t border-[#4B4B4B]"></div>

					{/* How We Use Your Information */}
					<section>
						<h2 className="text-2xl font-bold mb-4">
							How We Use Your Information
						</h2>
						<p className="text-gray-300 leading-relaxed">
							We use the collected information for the following purposes: To
							operate, maintain, and improve the app&apos;s functionality; To process
							your subscription and payments (handled via the App Store); and To
							communicate with you regarding updates or support issues.
						</p>
					</section>
					<div className="border-t border-[#4B4B4B]"></div>

					{/* Sharing and Disclosure */}
					<section>
						<h2 className="text-2xl font-bold mb-4">Sharing and Disclosure</h2>
						<p className="text-gray-300 leading-relaxed">
							We do not sell, rent, or trade your personal information. We may
							share anonymous usage data with third-party service providers
							(like Firebase or Google Analytics) to help us analyze how the app
							is used, provided they adhere to strict confidentiality terms.
						</p>
					</section>
					<div className="border-t border-[#4B4B4B]"></div>

					{/* Data Security */}
					<section>
						<h2 className="text-2xl font-bold mb-4">Data Security</h2>
						<p className="text-gray-300 leading-relaxed">
							We implement reasonable safeguards designed to protect your
							information. Because photos are deleted immediately after
							generation, and sensitive payment information is handled by the
							App Store, the risk of data compromise is minimal. However, no
							security system is impenetrable.
						</p>
					</section>

					<div className="border-t border-[#4B4B4B]"></div>

					{/* Changes to This Policy */}
					<section>
						<h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
						<p className="text-gray-300 leading-relaxed">
							We may update our Privacy Policy from time to time. We will notify
							you of any changes by posting the new Privacy Policy within the
							app. You are advised to review this policy periodically for any
							changes.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}