import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft                } from '@geist-ui/react-icons';


const BackToFriendList: React.FC<{ name: string }> = ({ name }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<div className="flex items-center mb-5">
			<button
				className="rounded-full shadow hover:shadow-md bg-white p-1"
				onClick={() => navigate(-1)}
			>
				<ArrowLeft />
			</button>
			<h1 className="text-xl ml-3 font-semibold">
				{name}
				<span className="font-light">&apos;s {pathname.split('/').pop()}</span>
			</h1>
		</div>
	);
};

export default BackToFriendList;