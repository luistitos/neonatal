const MotherStorage = {
	setUserData(data) {
		localStorage.setItem('neonatal:user', JSON.stringify(data));
	},
	getUserData() {
		const user = JSON.parse(localStorage.getItem('neonatal:user'));
		return user;
	}
};

const MotherApp = {
	init() {
		const userData = MotherStorage.getUserData();
		if (!userData) {
			location.assign('http://localhost:3333/sessions');
		}
	}
};

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
	name: document.querySelector('input#name'),
	bi: document.querySelector('input#bi'),
	phone: document.querySelector('input#phone'),
	birthday: document.querySelector('input#birthday'),
	marital: document.querySelector('select#marital'),
	fatherName: document.querySelector('input#father-name'),
	motherName: document.querySelector('input#mother-name'),
	work: document.querySelector('input#work'),
	workplace: document.querySelector('input#workplace'),
	home: document.querySelector('input#home'),
	district: document.querySelector('input#district'),
	neighborhood: document.querySelector('input#neighborhood'),
	avenue: document.querySelector('input#avenue'),
	referencePerson: document.querySelector('input#referencePerson'),
	referenceRelation: document.querySelector('input#referenceRelation'),
	referencePhone: document.querySelector('input#referencePhone'),
	referencePlace: document.querySelector('input#referencePlace'),

	getValues() {
		return {
			name: Form.name.value,
			bi: Form.bi.value,
			phone: Form.phone.value,
			birthday: Form.birthday.value,
			maritalStatus: Form.marital.value,
			father: Form.fatherName.value,
			mother: Form.motherName.value,
			work: Form.work.value,
			workplace: Form.workplace.value,
			home: Form.home.value,
			district: Form.district.value,
			neighborhood: Form.neighborhood.value,
			avenue: Form.avenue.value,
			referencePerson: Form.referencePerson.value,
			referenceRelation: Form.referenceRelation.value,
			referencePhone: Form.referencePhone.value,
			referencePlace: Form.referencePlace.value
		};
	},

	clearFields() {
		Form.name.value = '';
		Form.bi.value = '';
		Form.phone.value = '';
		Form.birthday.value = '';
		Form.marital.value = '';
		Form.fatherName.value = '';
		Form.motherName.value = '';
		Form.work.value = '';
		Form.workplace.value = '';
		Form.home.value = '';
		Form.district.value = '';
		Form.neighborhood.value = '';
		Form.avenue.value = '';
		Form.referencePerson.value = '';
		Form.referenceRelation.value = '';
		Form.referencePhone.value = '';
		Form.referencePlace.valu = '';
	},

	submit(event) {
		event.preventDefault();

		try {
			const data = Form.getValues();
			const { token } = MotherStorage.getUserData();

			Request.postData(data, '/mothers', token)
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
	},

	createFinger() {
		Request.postData({ type: 'mother' }, '/fingers', '')
			.then((response) => response.json())
			.then((data) => console.log(data));
	}
};

const Request = {
	async postData(data, route, token) {
		const url = `http://localhost:3333${route}`;
		const params = {
			headers: {
				'Content-Type': 'Motherapplication/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data),
			method: 'POST'
		};

		const response = await fetch(url, params);
		return response;
	}
};

MotherApp.init();
