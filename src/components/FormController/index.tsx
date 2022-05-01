import { FC, ReactElement, useState } from 'react';

type FormControllerProps = {
	children: (showForm: boolean, cb: () => void) => ReactElement;
};

const FormController: FC<FormControllerProps> = ({ children }) => {
	const [showForm, setShowForm] = useState(true);

	const setShowThx = () => {
		setShowForm(!showForm);
	};

	return children(showForm, setShowThx);
};

export default FormController;
