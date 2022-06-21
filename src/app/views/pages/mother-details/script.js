const Modal = {
	open() {
		// Abrir modal
		document.querySelector('.modal-overlay').classList.add('active');
	},
	close() {
		document.querySelector('.modal-overlay').classList.remove('active');
	}
};

const ChildrenStorage = {
	getUserData() {
		const user = JSON.parse(localStorage.getItem('neonatal:user'));
		return user;
	}
};

const ChildrenApp = {
	motherId: '',
	init() {
		const userData = ChildrenStorage.getUserData();
		if (!userData) {
			location.assign('http://localhost:3333/sessions');
		}
	},
	setMotherId(id) {
		this.motherId = id;
	},
	getMotherId(id) {
		return this.motherId;
	}
};

const Form = {
	name: document.querySelector('input#name'),
	sex: document.querySelector('select#sex'),
	fatherName: document.querySelector('input#father-name'),
	hospitalName: document.querySelector('input#hospitalName'),
	hospitalNumber: document.querySelector('input#hospitalNumber'),
	home: document.querySelector('input#home'),
	phone: document.querySelector('input#phone'),
	birthday: document.querySelector('input#birthday'),
	birthtime: document.querySelector('input#birthtime'),
	fingerId: null,
	fingerCreated: false,
	fingerSaved: false,

	getValues() {
		return {
			name: Form.name.value,
			sex: Form.sex.value,
			fatherName: Form.fatherName.value,
			hospitalName: Form.hospitalName.value,
			hospitalNumber: Form.hospitalNumber.value,
			home: Form.home.value,
			phone: Form.phone.value,
			birthday: Form.birthday.value,
			birthtime: Form.birthtime.value,
			fingerId: this.fingerId
		};
	},

	clearFields() {
		Form.name.value = '';
		Form.sex.value = '';
		Form.fatherName.value = '';
		Form.hospitalName.value = '';
		Form.hospitalNumber.value = '';
		Form.home.value = '';
		Form.phone.value = '';
		Form.birthday.value = '';
		Form.birthtime.value = '';
	},

	setFingerCreated() {
		this.fingerCreated = true;
		// Alterar o icon
		const element = document.getElementById('finger-icon');
		element.innerText = 'sync_problem';
		//Verificar de tempo em tempo se esta salvo na placa
		this.verifyFingerSaved();
	},

	setFingerSaved() {
		this.fingerSaved = true;
		//alterar icon
		const element = document.getElementById('finger-icon');
		element.innerText = 'check_circle';
	},

	verifyFingerSaved() {
		const response = Request.getData(`/fingers/${this.fingerId}`)
			.then((response) => response.json())
			.then(({ id, saved }) => {
				if (!saved) {
					setTimeout(() => {
						this.verifyFingerSaved();
					}, 3000);
				} else {
					this.setFingerSaved();
				}
			});
	},

	createFinger() {
		Request.postData({}, '/fingers/child', '')
			.then((response) => response.json())
			.then(({ id }) => {
				this.fingerId = id;
				this.setFingerCreated();
			});
	},

	submit(event) {
		event.preventDefault();

		if (!this.fingerCreated || !this.fingerSaved) {
			alert('Insira a impressao digital!!');
			return 0;
		}

		try {
			const data = Form.getValues();
			const { token } = ChildrenStorage.getUserData();
			const motherId = ChildrenApp.getMotherId();

			const requestData = {
				...data,
				motherId
			};

			Request.postData(requestData, '/children', token)
				.then(() => {
					alert('Dados cadastrados com sucesso');
				})
				.catch((error) => {
					console.log(error);
					alert('Falha ao cadastrar os dados');
				});

			Form.clearFields();
			Modal.close();
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
