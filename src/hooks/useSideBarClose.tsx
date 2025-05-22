import { RefObject, useEffect } from 'react';

type UseSideBarClose = {
	visible: boolean | undefined;
	onClose: () => void;
	ref: RefObject<HTMLDivElement>;
};

export const useSideBarClose = ({ visible, onClose, ref }: UseSideBarClose) => {
	useEffect(() => {
		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [visible, onClose, ref]);

	const handleClick = (e: MouseEvent) => {
		const { target } = e;
		if (
			target instanceof Node &&
			ref.current &&
			!ref.current.contains(target)
		) {
			onClose();
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (visible && e.key === 'Escape') {
			onClose?.();
		}
	};
};