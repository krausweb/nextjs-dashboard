import { useState, useEffect } from 'react';
import ModalCreatePortal from '@/app/lib/modal-create-portal';

export default function Modal({
	isOpen,
	body,
	header,
	footer,
	actionParentFunction,
}: {
	isOpen: boolean;
	body: string | JSX.Element;
	header?: string;
	footer?: string;
	actionParentFunction?: () => void;
}) {
	const [open, setOpen] = useState(false);

	const handleConfirmation = (state: boolean) => {
		if (state && actionParentFunction) {
			actionParentFunction();
		}

		setOpen(false);
	};

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	return (
		<>
			{open && (
				<ModalCreatePortal selector="#modal">
					<div className="relative">
						<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
							<div className="relative mx-auto my-6 w-auto max-w-3xl">
								{/*content*/}
								<div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
									{/*header*/}
									<div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
										<h3 className="text-3xl font-semibold">{header}</h3>
										<button
											className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
											type="button"
											onClick={() => handleConfirmation(false)}
										>
											<span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
												×
											</span>
										</button>
									</div>
									{/*body*/}
									<div className="relative flex-auto p-6">
										<p className="text-blueGray-500 my-4 text-lg leading-relaxed">{body}</p>
									</div>
									{/*footer*/}
									<div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
										<div className="text-sm">{footer}</div>
										<button
											className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
											type="button"
											onClick={() => handleConfirmation(false)}
										>
											No
										</button>
										<button
											className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
											type="button"
											onClick={() => handleConfirmation(true)}
										>
											Yes
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="fixed inset-0 z-40 bg-black opacity-25"></div>
					</div>
				</ModalCreatePortal>
			)}
		</>
	);
}
