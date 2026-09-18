import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'), //Получаем все формы
          inputs = document.querySelectorAll('input'); //Получаем все инпуты

    checkNumInputs('input[name="user_phone"]'); //Проверяем пришедшие в форму данные перед использованием

    const message = { //Оповещение пользователя 
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    const postData = async (url, data) => { //Формируем запрос
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => { //Функция для чистки инпутов
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => { //По сабмиту формы
            e.preventDefault(); //Отключаем стандартное поведение браузера

            let statusMessage = document.createElement('div'); //Создаем блок с оповещением
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); //Собираем данные формы
            if(item.getAttribute('data-calc') === 'end'){ //Если у формы есть определенный html-атрибут, то добавим еще данные в нее
                for(let key in state){ 
                    formData.append(key, state[key]); //Записываем в formData пару ключ/значение
                }
            }

            postData('assets/server.php', formData) //Отправляем запрос на сервер
                .then(res => { //обрабатываем ответ
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure) //На случай ошибки в запросе
                .finally(() => { //Сработает в любом случае запроса
                    clearInputs(); //Чистим инпуты
                    setTimeout(() => { //Через 5сек удаляем блок с сообщением
                        statusMessage.remove();
                    }, 5000);
                }); 
        });
    });
};

export default forms;