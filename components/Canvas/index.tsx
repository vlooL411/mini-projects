import { forwardRef, MutableRefObject, ReactElement, useEffect } from 'react';

type Props<T> = {
	setup: (htmlCanvasElement: HTMLCanvasElement) => T;
	draw?: (setup: T) => void;
	width?: number;
	height?: number;
	frameUpdate?: number;
};

function Canvas<T>(
	{
		setup,
		draw = () => null,
		width = 500,
		height = 500,
		frameUpdate = 1000 / 60,
	}: Props<T>,
	ref: MutableRefObject<HTMLCanvasElement>,
): ReactElement {
	useEffect(() => {
		const SetUp = setup(ref?.current);

		window.requestAnimationFrame(() =>
			setInterval(() => draw(SetUp), frameUpdate),
		);
	}, []);

	return <canvas ref={ref} width={width} height={height} tabIndex={1} />;
}

export default forwardRef(Canvas);
