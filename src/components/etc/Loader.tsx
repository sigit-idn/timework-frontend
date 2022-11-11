import React from "react";


const Loader: React.FC<{ size?: number }> = ({ size = 200 }) => {
	return (
		<div 
			className="flex justify-center items-center"
			style={{ height: size }}
		>
			<div 
				className="animate-spin rounded-full border-t-2 border-b-2 border-indigo-500"
				style={{ width: size * 0.8, height: size * 0.8 }}
			/>
		</div>
	);
};

export default Loader;