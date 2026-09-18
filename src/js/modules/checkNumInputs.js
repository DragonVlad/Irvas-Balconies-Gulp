const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    //Отбрасываем все не цифры
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;