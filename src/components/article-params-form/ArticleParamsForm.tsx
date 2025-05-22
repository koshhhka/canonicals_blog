import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'components/select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { Text } from 'components/text';
import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';
import {useSideBarClose} from "src/hooks/useSideBarClose";

type sideBarTypes = {
	isOpen?: boolean;
	applyParams: (settings: ArticleStateType) => void;
	toggleParams: () => void;
};

type ArticleParamsProps = {
	applyParams: (settings: ArticleStateType) => void;
};

const SideBar = ({ isOpen, applyParams, toggleParams }: sideBarTypes) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const refForm = useRef<HTMLDivElement | null>(null);

	const {
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	} = formState;

	useSideBarClose({
		visible: isOpen,
		ref: refForm,
		onClose: toggleParams,
	});

	const updateStateField = (field: string, value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleFormReset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		applyParams(defaultArticleState);
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		applyParams(formState);
		toggleParams();
	};
	return (
		<div ref={refForm}>
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onReset={handleFormReset}
					onSubmit={handleFormSubmit}>
					<Text as='p' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							updateStateField('fontFamilyOption', selected)
						}
						title='шрифт' />
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={(selected: OptionType) =>
							updateStateField('fontSizeOption', selected)
						}
						title='размер шрифта'></RadioGroup>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							updateStateField('fontColor', selected)
						}
						title='цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							updateStateField('backgroundColor', selected)
						}
						title='цвет фона'></Select>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							updateStateField('contentWidth', selected)
						}
						title='ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};

export const ArticleParamsForm = ({ applyParams }: ArticleParamsProps) => {
	const [isParamsOpen, setIsParamsOpen] = useState(false);
	const toggleParams = () => {
		setIsParamsOpen((prev) => !prev);
	};
	return (
		<>
			<ArrowButton isOpen={isParamsOpen} onClick={toggleParams} />
			<SideBar
				isOpen={isParamsOpen}
				applyParams={applyParams}
				toggleParams={toggleParams}
			/>
		</>
	);
};
