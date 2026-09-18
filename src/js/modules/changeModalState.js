import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    //Чтобы функция bindActionToElems не выдавала ошибки при получении одного параметра, 
    //ставим все переменные в All
   const windowForm = document.querySelectorAll('.balcon_icons_img'), //Получаем форму с табами
         windowWidth = document.querySelectorAll('#width'), //Получаем ширину балкона
         windowHeight = document.querySelectorAll('#height'), //Получаем высоту балкона
         windowType = document.querySelectorAll('#view_type'), //Получаем тип окна
         windowProfile = document.querySelectorAll('.checkbox'); //Получаем профиль окна

    checkNumInputs('#width');
    checkNumInputs('#height');

    /* Работа с оставшими данными будет абсолютно одинаковой, поэтому мы сделаем функцию, которая 
    будет выполнять все за нас, а мы лишь будем подставлять в нее аргументы */
    /* Первый параметр - event (событие), которое будет происходить (click, input)
       Второй - elem (элемент), на который вешаем событие
       Третий - prop (свойство), которое будем менять в стейте
    */
    function bindActionToElems(event, elem, prop){
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                //Если в обработчик события пришло больше одного элемента, то мы записываем их 
                //индекс в стейт
                //Для большей гибкости (чтобы можно было работать с разными элементами) 
                // мы будем использовать swith...case
                /* if(elem.length > 1){
                    state[prop] = i;
                } else { //Иначе записываем в стейт value этого инпута
                    state[prop] = item.value;
                } */
               //Если имя узла - span, то сохраняем его индекс
               //Если чекбокс - проверяем индекс. Если он равен нулю, то сохраняем в стейт Хололдное
               //иначе Горячее
               //также уберем галочки с всех чекбоксов, кроме кликнутого юзером
               switch(item.nodeName){
                    case 'SPAN': 
                        state[prop] = i;
                        break;
                    case 'INPUT': 
                        if(item.getAttribute('type') === 'checkbox'){
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Горячее';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if(i == j){
                                    box.checked = true;
                                }
                            });
                        } else {   
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT': 
                        state[prop] = item.value;
                        break;
               }
               console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form'); //Табы
    bindActionToElems('input', windowHeight, 'height'); //Высота балкона
    bindActionToElems('input', windowWidth, 'width'); //Ширина балкона
    bindActionToElems('change', windowType, 'type'); //Тип окна
    bindActionToElems('change', windowProfile, 'profile'); //Профиль окна

    /* в функцию changeModalState мы передаем пустой modalState. При клике на определенное 
    изображение в объекте state создается новое поле form (форма балкона). Чтобы запомнить, на 
    какую форму кликнул пользователь, мы передаем сюда индекс. */
    //Поскольку этот функционал одинаков для всех данных, то мы вместо него используем функцию выше
   /* windowForm.forEach((item, i) => {
        item.addEventListener('click', () => {
            state.form = i;
            console.log(state);
        });
   }); */
};

export default changeModalState;