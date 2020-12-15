import placeholder from 'components/InfintyScroll/placeholder.json';
import ScrollLoadMore from 'components/InfintyScroll/ScrollLoadMore';
import { first, last } from 'components/InfintyScroll/utils';
import { ReactElement, useState } from 'react';

type Elem = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

const getLocal = (): number => Number(localStorage.getItem('el'));

let localDate: Date = null;
const setLocal = (id: number): void => {
	const date = new Date();
	localDate = date;
	setInterval(() => {
		if (localDate == date) localStorage.setItem('el', id.toString());
	}, 50);
};

const size = Array.from(
	{ length: placeholder.length },
	() => (Math.random() * 200) % 50,
);

const ScrollElem = ({ title, id }: Elem) => {
	return (
		<h3
			key={id}
			id={`#${id}`}
			style={{
				background: `rgb(${50}, ${100}, ${id * Math.random()})`,
				height: size[id],
			}}
			onMouseMove={() => {
				setLocal(id);
			}}>
			<span style={{ color: 'aqua' }}>{id}</span> {title}
		</h3>
	);
};

const limit = 3;

const scrollinfinity = (): ReactElement => {
	const [array, setArray] = useState<Elem[]>([]);

	const filter = (begin: number, end: number): Elem[] =>
		[...array, ...placeholder.slice(begin, end)]
			.filter(
				({ id }, i, currentArray) =>
					currentArray.findIndex(el => id == el.id) == i,
			)
			.sort((a, b) => a.id - b.id);

	const onLoadMoreUp = (isUpdate: boolean, id: number): void => {
		const upID = id ?? first(array)?.id;
		if (!isUpdate && upID == first(placeholder).id && array.length > 1) return;

		let index = placeholder.findIndex(el => el.id == upID) - limit + 1;
		if (index < 0) index = 0;
		setArray(filter(index, index + limit));
	};

	const onLoadMoreDown = (isUpdate: boolean): void => {
		const downID = last(array)?.id;
		if (!isUpdate && downID == last(placeholder).id && array.length > limit)
			return;

		let index = placeholder.findIndex(el => el.id == downID) + limit;

		const { length } = placeholder;
		if (index > length) index = length;
		setArray(filter(index - limit, index));
	};

	return (
		<ScrollLoadMore<Elem, number>
			array={array}
			getLocalID={getLocal}
			onElemInit={ScrollElem}
			onScrollUp={onLoadMoreUp}
			onScrollDown={onLoadMoreDown}
		/>
	);
};

export default scrollinfinity;
