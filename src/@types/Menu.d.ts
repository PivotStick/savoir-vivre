type Menu = {
	categories: {
		name: string;
		items: {
			name: string;
			orders: string[];
		}[];
	}[];
};
