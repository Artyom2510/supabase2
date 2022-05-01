export type NewsDTO = {
	title: string;
	desc: string;
	id?: number | string | null;
	created_at?: Date | string;
	status?: boolean;
	user_id?: string;
};
