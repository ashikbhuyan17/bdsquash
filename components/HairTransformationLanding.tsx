import Image from "next/image";
import Link from "next/link";
import apple from "../public/apple.png";

export default function HairTransformationLanding() {
	return (
		<div className=" text-white flex items-center justify-center px-4 ">
			<div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
				{/* Left Section */}
				<div className="space-y-6 max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center animate-left">
					<div className="bg-[#221D21] w-[224px] p-3 rounded-md">
						<div className="flex items-start gap-x-6  ">
							<Image src="/victory.png" alt="Logo" width={20} height={25} />
							<div className="">
								<Image
									src="/tryon360.today.png"
									alt="Logo"
									width={55}
									height={10}
								/>
								<span className="text-sm font-bold text-[#EEF2FF}">
									#1 AI Product
								</span>
							</div>
						</div>
					</div>

					<p className="text-white text-xs sm:text-sm border-2 border-gray-500 inline-block px-3 py-1 rounded-full">
						Get inspired to unlock the full potential of your beauty
					</p>

					<div className="max-md:w-full max-lg:w-[65%] max-lg:text-center ">
						<h1 className="text-3xl md:text-5xl font-bold leading-tight">
							Smart Hair Style &<br />
							Beauty Transformation
						</h1>
						{/* <AnimatedTextGenerate
							text="Smart  Hair Cut & Beauty Transformation "
							className=""
							textClassName="text-3xl md:text-5xl font-bold leading-tight truncate"
							blurEffect={true}
							speed={0.8}
							highlightWords={["Smart", "Transformation"]}
							// highlightClassName="text-[#BF32A6]"
							linkWords={["everything"]}
							linkHrefs={["/about"]}
							linkClassNames={["underline text-red-500"]}
						/> */}
						{/* <AnimatedTextGenerate
							text=" Beauty Transformation"
							className="tracking-wide"
							textClassName="text-3xl md:text-5xl font-bold leading-tight"
							blurEffect={true}
							speed={0.5}
							highlightWords={["Beauty", "Transformation"]}
							// highlightClassName="text-[#BF32A6]"
							linkWords={["everything"]}
							linkHrefs={["/about"]}
							linkClassNames={["underline text-red-500"]}
						/> */}
						{/* <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mt-2">
							Assistant
						</h2> */}
						<h2
							style={{
								background: "linear-gradient(90deg, #EA580C 0%, #4F46E5 100%)",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								fontSize: "48px",
								fontWeight: 700,
							}}
						>
							Assistant
						</h2>
						<p className="text-[#F3F4F6]  sm:text-lg">
							Experience next-level style discovery — try new haircuts, colors,
							and makeup virtually with TryOn360.
						</p>
					</div>

					<div className="flex items-center max-md:flex-wrap max-md:justify-center gap-3">
						<a
							href={
								"https://apps.apple.com/us/app/tryon360-ai-hair-styles/id6754063943"
							}
							target="_blank"
							className="w-[220px] h-[58px] "
						>
							<button
								className=" px-8 py-4 font-semibold flex items-center gap-2 shadow-lg transition-all duration-400 hover:scale-105  cursor-pointer"
								style={{
									borderRadius: "8px",
									background:
										"linear-gradient(90deg, #EA580C 0%, #D946EF 50%, #4F46E5 100%)",
								}}
							>
								Get Free Access
								<span className="text-xl">⚡</span>
							</button>
						</a>
						<a
							href={
								"https://apps.apple.com/us/app/tryon360-ai-hair-styles/id6754063943"
							}
							target="_blank"
							className="w-[220px] h-[58px]"
						>
							<button
								className=" px-10 p-[14px] font-semibold flex items-center gap-2 shadow-lg transition-all duration-400 hover:scale-105  cursor-pointer"
								style={{
									borderRadius: "8px",
									background: "white",
								}}
							>
								<Image src={apple} alt="Apple Logo" />
								<div className="text-black">
									<p className="text-xs text-gray-600 leading-none m-0">
										Download on the
									</p>
									<p className="font-bold text-xl leading-none m-0">
										App Store
									</p>
								</div>
							</button>
						</a>
					</div>

					{/* Testimonial */}
					{/* <div className="flex items-start gap-4 pt-8 border-t border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Alex Syl"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-[#6B7280] italic text-sm mb-2">
                {`"I am about to launch a new product and needed inspiration for
								creating our new Product Hunt launch video. This site has been
								an amazing resource for us. "`}
              </p>
              <p className="text-white text-sm">
                Alex Syl, Founder of Composables
              </p>
            </div>
          </div> */}
				</div>

				{/* Right Section - Upload Card */}
				<div>
					<img src="/hero.png" alt="hero" />
				</div>
				{/* <div
          className="relative rounded-[35px] p-8 shadow-2xl animate-right"
          style={{
            // width: '608px',
            // height: '761px',
            flexShrink: 0,
            background: 'linear-gradient(180deg, #E8561D 0%, #D946EF 138.5%)',
            boxShadow: '0 4px 4px 11px rgba(255, 97, 97, 0.25)',
          }}
        >
          <div className="text-center space-y-2 h-full flex flex-col">
            <h3 className="text-2xl md:text-3xl font-bold">
              Upload or take a photo
            </h3>
            <p className="text-white font-medium">
              AI suggests haircut styles based on
              <br />
              face shape and gender.
            </p>

            <div className="relative  backdrop-blur-sm rounded-3xl p-6 flex-1 flex items-center justify-center">
              <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-white rounded-tl-2xl"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-white rounded-tr-2xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-white rounded-bl-2xl"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-white rounded-br-2xl"></div>

              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/user.jpg"
                  alt="Example selfie"
                  className="w-full h-full object-fill rounded-2xl opacity-80"
                />

                <div className="absolute bottom-8 left-0 right-0 text-center space-y-2">
                  <p className="text-white text-lg font-bold drop-shadow-lg">
                    {"Drag 'n'"} drop your selfie here
                  </p>
                  <button
                    className="inline-flex items-center gap-3 px-8 py-2 cursor-pointer transition-all font-semibold text-lg mx-auto"
                    style={{
                      borderRadius: '44px',
                      background: 'rgba(255, 255, 255, 0.10)',
                      backdropFilter: 'blur(5px)', // matches Tailwind's backdrop-blur-sm
                    }}
                  >
                    Upload your selfie
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-scan"></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
			</div>
		</div>
	);
}
