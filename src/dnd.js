/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createDiv() {
    var div = document.createElement('div');

    div.setAttribute('class', 'draggable-div');
    div.setAttribute('draggable', 'true');
    div.style.width = `${getRandomInt(1, 201)}px`;
    div.style.height = `${getRandomInt(1, 201)}px`;
    div.style.backgroundColor = `rgb(${getRandomInt(0, 256)}, ${getRandomInt(0, 256)},${getRandomInt(0, 256)})`;
    div.style.position = 'absolute';
    div.style.top = `${getRandomInt(0, 100)}%`;
    div.style.left = `${getRandomInt(0, 100)}%`;

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    function dragStart(e) {
        e.target.style.opacity = '0.4';
    }
    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        return false;
    }
    function dragEnd(e) {
        e.target.style.opacity = '1';
        e.target.style.top = e.clientY + 'px';
        e.target.style.left = e.clientX + 'px';
    }

    target.addEventListener('dragstart', dragStart, false);
    target.addEventListener('dragover', dragOver, false);
    target.addEventListener('dragend', dragEnd, false);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
  // создать новый div
    let div = createDiv();

  // добавить на страницу
    homeworkContainer.appendChild(div);
  // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
  // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
  // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
