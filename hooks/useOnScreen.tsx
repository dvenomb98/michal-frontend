import { useEffect, useState, useRef, RefObject } from 'react';

const useOnScreen = (
	ref: RefObject<HTMLElement>,
	triggers: Array<any> = [], // Add triggers
) => {
	const [isOnScreen, setIsOnScreen] = useState(false);
	const observerRef = useRef<IntersectionObserver>();

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) =>
			setIsOnScreen(entry.isIntersecting),
		);
	}, []);

	useEffect(() => {
		if (!!observerRef.current && !!ref.current) {
			observerRef.current.observe(ref.current);

			return () => {
        observerRef.current!.disconnect();
			};
		}
	}, [ref, ...triggers]); // Let the triggers fire the effect too on changes

	return isOnScreen;
};

export default useOnScreen;
