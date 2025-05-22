import { createRoot } from 'react-dom/client';
import { useState, StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleStyle, setArticleStyle] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyle.fontFamilyOption.value,
					'--font-size': articleStyle.fontSizeOption.value,
					'--font-color': articleStyle.fontColor.value,
					'--container-width': articleStyle.contentWidth.value,
					'--bg-color': articleStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applyParams={setArticleStyle} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
