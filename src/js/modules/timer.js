const timer = (id, deadline) => { //id-область, куда отрисуем таймер
    //getTimeRemaining будет получать время, и рассчитывать, сколько его осталось до конца акции
    const addZero = (num) => { //Добавляем ноль к одиночным числам
        if(num <= 9){
            return '0' + num;
        } else {
            return num;
        }
    }; 

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()), //Считаем разницу между моментом с 1970 года и текущим моментом
              seconds = Math.floor((t/1000) % 60), //Получаем секунды из t
              minutes = Math.floor((t/1000/60) % 60), //Получаем минуты из t
              hours = Math.floor((t/(1000 * 60 * 60)) % 24), //Получаем часы из t
              days = Math.floor((t/(1000 * 60 * 60 * 24))); //Получаем дни из t 

        return {
            'total': t, //все время
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    //setClock отвечает за размещение определенных значений в определенные элементы на странице.
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock(){ //Определяет сколько времени осталось до дедлайна
            const t = getTimeRemaining(endtime); //Узнаем сколько времени осталось до конца. Также с ее помощью ставим новые значения

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0){ //Если общее кол-во времени равно нулю, то зануляем данные и останавливаем таймер
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval);
            }
        }   
    };

    setClock(id, deadline);
};

export default timer;