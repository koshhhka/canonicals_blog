import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowTypes = {
	isOpen?: boolean;
	onClick?: OnClick;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowTypes) => {
	return (
		<div
			role='button'
			aria-label={isOpen ? 'Открыть форму' : 'Закрыть форму'}
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={onClick}
		>
			<img
				src={arrow}
				alt='Иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
