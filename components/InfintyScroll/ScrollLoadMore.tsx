import { ReactElement, useEffect, useRef, useState } from 'react';

import Scroll from '.';

type State = {
	isNotScrollHeightSameOffset?: boolean;
	isScrollUp?: boolean;
	isScrollUpRepeat?: boolean;
	lastScrollHeight?: number;
};

type Props<T, ID> = {
	className?: string;
	array: T[];
	scrollUp?: number;
	scrollDown?: number;
	onElemInit: (el: T, key: string | number) => ReactElement;
	getLocalID: () => ID;
	onScrollUp: (isUpdate?: boolean, id?: ID) => void;
	onScrollDown: (isUpdate?: boolean) => void;
};

//TODO slow scrolling (worth rewriting to slice scroll)
const ScrollLoadMore = function <T, ID>({
	className = 'scroll',
	array,
	scrollUp = 100,
	scrollDown = 100,
	onElemInit,
	getLocalID,
	onScrollUp,
	onScrollDown,
}: Props<T, ID>): ReactElement {
	const [state] = useState<State>({});
	const scrollRef = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		const scroll = (): boolean => {
			if (!state.isNotScrollHeightSameOffset) return;
			return true;
		};

		if (scroll()) return;

		const { current } = scrollRef;
		const { scrollTop, scrollHeight, offsetHeight } = current;

		state.isNotScrollHeightSameOffset = scrollHeight != offsetHeight;
		if (scroll()) return;
		state.lastScrollHeight = scrollHeight;

		if (scrollTop == 0 && !state.isScrollUp) {
			onScrollUp(true, state.isScrollUpRepeat ? null : getLocalID());
			state.isScrollUpRepeat = true;
			state.isScrollUp = true;
		} else {
			state.isScrollUp = false;
			!state.isNotScrollHeightSameOffset && onScrollDown(true);
		}
	}, [array]);

	return (
		<Scroll
			className={className}
			ref={scrollRef}
			scrollUp={scrollUp}
			scrollDown={scrollDown}
			onScrollUp={() => {
				onScrollUp(false);
				scrollRef.current.scrollTo({ top: 1 });
			}}
			onScrollDown={() => onScrollDown(false)}>
			{array?.map(onElemInit)}
		</Scroll>
	);
};

export default ScrollLoadMore;
