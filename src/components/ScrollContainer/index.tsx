import React, { useRef, useLayoutEffect } from 'react';

type Props = {
	className?: string;
};

const ScrollContainer: React.FC<Props> = ({ className, children }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (containerRef.current !== null) {
			const scrollHeight = containerRef.current.scrollHeight;
			const containerHeight = containerRef.current.clientHeight;

			if (scrollHeight > containerHeight) {
				containerRef.current.scrollTop = scrollHeight;
			}
		}
	}, [children]);

	return (
		<div className={className} ref={containerRef}>
			{children}
		</div>
	);
};

export default ScrollContainer;
