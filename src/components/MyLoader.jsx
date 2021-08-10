import ContentLoader from "react-content-loader";

import React from "react";

function MyLoader(props) {
	return (
		<ContentLoader
			speed={2}
			width={210}
			height={260}
			viewBox="0 0 210 260"
			backgroundColor="#e0e0e0"
			foregroundColor="#ededed"
			className="MyLoader"
			{...props}
		>
			<rect x="29" y="36" rx="10" ry="10" width="150" height="91" />
			<rect x="30" y="143" rx="0" ry="0" width="150" height="15" />
			<rect x="30" y="162" rx="3" ry="3" width="93" height="15" />
			<rect x="30" y="199" rx="0" ry="0" width="80" height="24" />
			<rect x="148" y="191" rx="8" ry="8" width="32" height="32" />
		</ContentLoader>
	);
}

export default MyLoader;
