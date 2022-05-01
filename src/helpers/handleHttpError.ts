export const handleHttpError = (error: unknown) => {
	const err = error as Error;
	if (err.message) return err.message;
	return 'unknown error';
};
