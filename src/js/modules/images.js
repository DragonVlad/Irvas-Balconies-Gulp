const images = () => {
    const imgPopup = document.createElement('div'), //Создаем модалку
          workSection = document.querySelector('.works'), //Получаем блок для изображений
          bigImage = document.createElement('img'); //Создаем изображение

    imgPopup.classList.add('popup'); //Стилизуем модалку
    workSection.appendChild(imgPopup); //Отображаем модалку в workSection

    imgPopup.style.justifyContent = 'center'; //Центрируем изображение по горизонтали 
    imgPopup.style.alignItems = 'center'; //Центрируем изображение по вертикали
    imgPopup.style.display = 'none'; //Изначально изображение скрыто

    imgPopup.appendChild(bigImage); //Добавляем в модалку созданное нами изображение

    workSection.addEventListener('click', (e) => { //Обработка клика
        e.preventDefault(); //Отключение обычного поведения браузера

        let target = e.target; 

        //Если пользователь кликнул в картинку, то показываем модалку
        if(target && target.classList.contains('preview')){ 
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href'); //Получаем ссылку на Большое изображение (фон)
            bigImage.setAttribute('src', path); //и ставим ее в наше изображение
        }

        if(target && target.matches('div.popup')){ //По клику на подложку модалка закрывается
            imgPopup.style.display = 'none';
        }
    });
};

export default images;