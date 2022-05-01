import { createClient, User, SupabaseClient } from '@supabase/supabase-js';
import { NewsDTO } from '../models/NewsDto.dto';

const supabaseUrl = String(process.env.REACT_APP_SUPABASE_URL);
const supabaseAnonKey = String(process.env.REACT_APP_SUPABASE_ANON_KEY);

type SignUpPayload = {
	login: string;
	password: string;
	admin?: string;
};

class SupaBaseClient {
	supabase: SupabaseClient;
	constructor() {
		this.supabase = createClient(supabaseUrl, supabaseAnonKey);
	}

	getUserCred(): User | null {
		return this.supabase.auth.user();
	}

	async signUp({
		login,
		password,
		admin = 'guest'
	}: SignUpPayload): Promise<User> {
		const { user, error } = await this.supabase.auth.signUp(
			{
				password,
				email: `${login}@gmail.com`
			},
			{
				data: {
					admin
				}
			}
		);

		if (error) throw new Error(error.message);
		if (!user) throw new Error('user not found');

		return user;
	}

	async signIn({ login, password }: SignUpPayload): Promise<User> {
		const { user, error } = await this.supabase.auth.signIn({
			email: `${login}@gmail.com`,
			password
		});

		if (error) throw new Error(error.message);
		if (!user) throw new Error('user not found');

		return user;
	}

	async logOut() {
		return this.supabase.auth.signOut();
	}

	async getNewsList() {
		const { data, error } = await this.supabase.from<NewsDTO>('news').select();
		return data || [];
	}

	async getApprovedNewsList() {
		const { data, error } = await this.supabase
			.from<NewsDTO>('news')
			.select()
			.match({ status: true });
		return data || [];
	}

	async createNews(news: NewsDTO) {
		const { data, error } = await this.supabase
			.from<NewsDTO>('news')
			.insert(news, { returning: 'representation' });

		return data?.[0];
	}

	async updateNews(news: Partial<NewsDTO>) {
		const { id, ...rest } = news;
		const { data, error } = await this.supabase
			.from<NewsDTO>('news')
			.update(rest, { returning: 'representation' })
			.match({ id });

		return data?.[0];
	}

	async deleteNews(id: number | string) {
		const { data, error } = await this.supabase
			.from<NewsDTO>('news')
			.delete()
			.match({ id });

		return data?.[0];
	}
}

export const supaBaseClient = new SupaBaseClient();
