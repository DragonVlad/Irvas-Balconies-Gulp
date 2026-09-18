const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);
  
    function hideTabContent(){
        content.forEach(item => {
            item.style.display = 'none';
        });

        //Когда мы кликаем на определенные табы, у них меняется класс активности
        tab.forEach(item => {
            item.classList.remove(activeClass); //Убираем класс активности у всех табов.
        });
    }
    
    function showTabContent(i = 0){ //Показывает только определенный контент
        //Если ничего не передаем при вызове tabs, то подставляется block, иначе - оно подставится 
        // в этой функции
        content[i].style.display = display; //Заменяем 'block' на переменную display
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    //Отслеживаем, на какой таб клинул пользователь. 
    header.addEventListener('click', (e) => {
        const target = e.target;
        //Проверяем кликнул ли пользователь куда мы задумали
        if(target &&
           target.classList.contains(tabSelector.replace(/\./, "")) 
           || target.parentNode.classList.contains(tabSelector.replace(/\./, ""))){ 
            tab.forEach((item, i) => { //item - перебираемый элемент, i - его номер
                if(target == item || target.parentNode == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;