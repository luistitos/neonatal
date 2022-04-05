const GlobalStorage = {
	getUserData() {
		const user = JSON.parse(localStorage.getItem('neonatal:user'));
		return user;
	},
	clearUserData() {
		localStorage.removeItem('neonatal:user');
	}
};

const App = {
	init() {
		const { user = {}, exp = '' } = GlobalStorage.getUserData();

		if (user && exp) {
			const parsedExp = new Date(exp);

			if (parsedExp < new Date()) {
				GlobalStorage.clearUserData();
				location.assign('http://localhost:3333/sessions');
			}
		} else {
			GlobalStorage.clearUserData();
			location.assign('http://localhost:3333/sessions');
		}
	},
	logout() {
		GlobalStorage.clearUserData();
		location.assign('http://localhost:3333/sessions');
	}
};

App.init();
