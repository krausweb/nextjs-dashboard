// See the official NextJS example on: https://github.com/vercel/next.js/tree/canary/examples/with-portals

import { useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function ModalCreatePortal({ children, selector }: { children: ReactNode; selector: string }) {
	const ref = useRef<Element | null>(null);
	const [mounted, setMounted] = useState(false);

	useLayoutEffect(() => {
		ref.current = document.querySelector(selector);
		setMounted(true);
	}, [selector]);

	return mounted ? createPortal(children, ref.current || document.body) : null;
}
