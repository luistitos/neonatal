const Modal = {
	open() {
		// Abrir modal
		document.querySelector('.modal-overlay').classList.add('active');
	},
	close() {
		document.querySelector('.modal-overlay').classList.remove('active');
	}
};

const Form = {
	fingerId: null,
	fingerCreated: false,
	fingerSaved: false,
	MotherFingerId: null,
	MotherFingerCreated: false,
	MotherFingerSaved: false,

	getValues() {
		return {
			childFinger: this.fingerId,
			motherFinger: this.MotherFingerId
		};
	},

	setFingerCreated() {
		this.FingerCreated = true;
		// Alterar o icon
		const element = document.getElementById('finger-icon');
		element.innerText = 'sync_problem';
		//Verificar de tempo em tempo se esta salvo na placa
		this.verifyFingerSaved();
	},

	setFingerSaved(id) {
		this.fingerSaved = true;
		//alterar icon
		const element = document.getElementById('finger-icon');
		element.innerText = 'check_circle';
		this.fingerId = id;
		console.log(id);
	},

	verifyFingerSaved() {
		const response = Request.getData(`/fingers/search/last`)
			.then((response) => response.json())
			.then(({ motherFinger, childFinger }) => {
				if (!childFinger) {
					setTimeout(() => {
						this.verifyFingerSaved();
					}, 3000);
				} else {
					this.setFingerSaved(childFinger);
				}
			});
	},

	createFinger() {
		Request.postData({}, '/fingers/search/type/child', '').then((response) => {
			this.setFingerCreated();
		});
	},

	setMotherFingerSaved(id) {
		this.motherFingerSaved = true;
		//alterar icon
		const element = document.getElementById('mother-finger-icon');
		element.innerText = 'check_circle';
		this.MotherFingerId = id;
	},

	verifyMotherFingerSaved() {
		const response = Request.getData(`/fingers/search/last`)
			.then((response) => response.json())
			.then(({ motherFinger, childFinger }) => {
				console.log(motherFinger);
				if (!motherFinger) {
					setTimeout(() => {
						this.verifyMotherFingerSaved();
					}, 3000);
				} else {
					this.setMotherFingerSaved(motherFinger);
				}
			});
	},

	setMotherFingerCreated() {
		this.MotherFingerCreated = true;
		// Alterar o icon
		const element = document.getElementById('mother-finger-icon');
		element.innerText = 'sync_problem';
		//Verificar de tempo em tempo se esta salvo na placa
		this.verifyMotherFingerSaved();
	},

	createMotherFinger() {
		Request.postData({}, '/fingers/search/type/mother', '').then((response) => {
			this.setMotherFingerCreated();
		});
	},

	submit(event) {
		event.preventDefault();

		try {
			const { motherFinger, childFinger } = Form.getValues();
			const { token } = ChildrenStorage.getUserData();
			Request.getData(`/fingers/verify/match/${motherFinger}/${childFinger}`)
				.then((response) => response.json())
				.then(({ match }) => {
					if (match) {
						alert('As impressões digitais da mae e do bebe correspondem!');
					} else {
						alert('As impressões digitais da mae e do bebe não correspondem!');
					}
				});
		} catch (error) {
			alert(error.message);
		}
	}
};

const Request = {
	async postData(data, route, token) {
		const url = `http://localhost:3333${route}`;
		const params = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data),
			method: 'POST'
		};

		const response = await fetch(url, params);
		return response;
	},

	async getData(route) {
		const url = `http://localhost:3333${route}`;
		const params = {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'GET',
			redirect: 'follow'
		};

		const response = await fetch(url, params);
		return response;
	}
};

const ChildrenStorage = {
	getUserData() {
		const user = JSON.parse(localStorage.getItem('neonatal:user'));
		return user;
	}
};
