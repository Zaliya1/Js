const validateForm = () => {
    
    const forms = document.querySelectorAll('.form-horizontal, form[name="callback-form"], form[name="application-form"]');
    forms.forEach(form => {
        const inputs = document.querySelectorAll('.form-control');
        const inputName = form.querySelector('input[name="fio"]');
        const inputPhone = form.querySelector('input[name="phone"]');
        const btns = document.querySelectorAll('.service-button');
        let errorInputName = true;
        let errorInputPhone = true;
        let dataSubject;

        form.setAttribute('novalidate', 'novalidate'); // отключение стадарт. валидации
        inputs.forEach(input => {
            input.setAttribute("required","required"); // все инпуты обязательные
        });
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                dataSubject = btn.querySelector('a').getAttribute('data-subject');
            });
        });
        
        inputName.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^а-яА-Я\ ]/, '');
            if (event.target.value.match(/[^а-яА-Я\ ]/g) !== null || event.target.value.length < 2) {
                errorInputName = true;
            } else {
                inputName.classList.remove('error');
                errorInputName = false;
            }
        });
        inputName.addEventListener('blur', (event) => { //1 буква большая, остальные маленькие
            event.target.value = event.target.value.replace(/([а-яА-Я\ ]){1,}/g, () => {
                let str = event.target.value;
                if (!str.includes(" ")) {
                    let updateStr = '';
                    for (let i = 0; i<str.length; i++) {
                        if (i === 0) {
                            updateStr += str[i].toUpperCase(); 
                        } else {
                            updateStr += str[i].toLowerCase();
                        }
                    }
                    return updateStr;
                } else {
                    let arr = str.split(" ");
                    let updateStr = '';
                    for (let n = 0; n<arr.length; n++) {
                        for (let i = 0; i<arr[n].length; i++) {
                            if (i === 0) {
                                updateStr += arr[n][i].toUpperCase(); 
                            } else {
                                updateStr += arr[n][i].toLowerCase();
                            }
                        }
                        updateStr += " ";
                    }
                    updateStr = updateStr.replace(/ $/g, '');
                    return updateStr;
                }
            });
        });
        inputPhone.addEventListener('input', (event) => {
            // если номер телефона слишком короткий, ошибка
            if (event.target.value.length < 18) {
                errorInputPhone = true;
            } else {
                inputPhone.classList.remove('error');
                errorInputPhone = false;
            }
        });
        
        function maskPhone(masked = '+7 (___) ___ __ __') { 
            function mask(event) {
                const keyCode = event.keyCode;
                const template = masked,
                    def = template.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");
                let i = 0,
                    newValue = template.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                    });
                i = newValue.indexOf("_");
                if (i != -1) {
                    newValue = newValue.slice(0, i);
                }
                let reg = template.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}";
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                    this.value = newValue;
                }
                if (event.type == "blur" && this.value.length < 5) {
                    this.value = "";
                }
            }
            inputPhone.addEventListener("input", mask);
            inputPhone.addEventListener("focus", mask);
            inputPhone.addEventListener("blur", mask);
        }
    
        const sendData = (data) => {
            return fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .catch(error => {
                statusBlock.textContent = 'Ошибка';
            });
        };
        const submitForm = () => {
            const formData = new FormData(form);
            const formBody = {};
            const calculateTotal = document.querySelector('#calc-total');
            const statusBlock = document.createElement('span');
            
            form.append(statusBlock);
            statusBlock.textContent = 'Загрузка';
            formData.forEach((val, key) => {
                formBody[key] = val;
            });
            if (calculateTotal && calculateTotal.value !== "") {
                formBody['Сумма'] = calculateTotal.value;
            }
            formBody['subject'] = dataSubject;
            sendData(formBody);

            inputName.value = "";
            inputPhone.value = "";
            statusBlock.textContent = 'Спасибо! Наш менеджер свяжется с вами';
            const clearText = () => {
                statusBlock.textContent = "";
            };
            setTimeout(clearText, 5000);
        };
    
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (errorInputName) {
                inputName.classList.add('error');
            }
            if (errorInputPhone) {
                inputPhone.classList.add('error');
            }
            else if (!errorInputName && !errorInputPhone) {
                submitForm(); // Если инпуты заполнены верно, отправка данных на сервер
            }
        });
        maskPhone();
    });
    
};
export default validateForm;
