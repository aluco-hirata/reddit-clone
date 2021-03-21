import React, { FC } from 'react';
import classNames from 'classnames';

interface InputGroupProps {
	className?: string;
	type: string;
	placeholder: string;
	value: string;
	error: string | undefined;
	setValue: (str: string) => void;
}

const InputGroup: FC<InputGroupProps> = ({
	className,
	type,
	placeholder,
	value,
	error,
	setValue,
}) => {
	return (
		<div className={className}>
			<input
				type={type}
				className={classNames(
					'w-full p-3 outline-none bg-gray-100 border border-gray-300 rounded focus:bg-white hover:bg-white duration-200',
					{ 'border-red-500': error },
				)}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<small className="block font-medium text-red-600">{error}</small>
		</div>
	);
};

export default InputGroup;
