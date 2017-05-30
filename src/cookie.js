/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let cookieArray = [];

// Клики по "Удалить"
listTable.addEventListener('click', function(e) {
    if (e.target.tagName == 'BUTTON') {
        var container = e.target.closest('tr'),
            cookieName = container.querySelector('td').textContent;

        removeCookie(cookieName);
        removeTableRow(container, e.currentTarget);
        updateCookieArray(cookieName, 0, true);
        console.log(cookieArray);
    }
});
// Проверка строки на содержание подстроки
function isMatching(full, chunk) {
    var reg = new RegExp(chunk, 'i'), 
        res;

    res = full.search(reg);

    if (res < 0) {
        return false;
    }

    return true;
}
// Добавление записи в таблицу
function addTableRow(name, value) {
    var tr = document.createElement('tr'),
        tdName = document.createElement('td'),
        tdValue = document.createElement('td'),
        tdButton = document.createElement('td');

    tdName.innerText = name;
    tdValue.innerText = value;
    tdButton.innerHTML = '<button>Удалить</button>';

    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdButton);
    listTable.appendChild(tr);
}
// Добавление куки
function addCookie(name, value) {
    document.cookie = `${name}=${value}`;
}
// Удаление куки
function removeCookie(name) {
    var date = new Date(0);

    document.cookie = name + '=;expires=' + date;
}
// Удаление записи в таблице
function removeTableRow(target, parent) {
    parent.removeChild(target);
}
// Сборка массива с куки
function buildCookieArray() {
    cookieArray = document.cookie.split('; ');
    if (cookieArray[0] == '') {
        console.log('cookie нет');
        cookieArray = [];

        return;
    }
    for (var i = 0; i < cookieArray.length; ++i) {
        var [name, value] = cookieArray[i].split('=');

        cookieArray[i] = { name: name, value: value };
    }
}
// Обновление массива с куки
function updateCookieArray(name, value, del = false) {
    var isUpdated = false;

    if (del) {
        for (var i = 0; i < cookieArray.length; ++i) {
            if (cookieArray[i].name === name) {
                cookieArray.splice(i, 1);
                break;
            }
        }

        return;
    }
    if (cookieArray.length == 0 || typeof cookieArray[0] != 'object') {
        buildCookieArray();

        return;
    }
    for (var i = 0; i < cookieArray.length; ++i) {
        if (cookieArray[i].name == name) {
            cookieArray[i].value = value;
            isUpdated = true;
            break;
        }
    }
    if (!isUpdated) {
        cookieArray.push({ name: name, value: value });
    }
}
// Обновление отображаемых куки
function updateCookieList(name, value) {
    if (
    !isMatching(name, filterNameInput.value) &&
    !isMatching(value, filterNameInput.value)
  ) {
        for (var i = 0; i < listTable.children.length; ++i) {
            if (listTable.children[i].children[0].innerText == name) {
                removeTableRow(listTable.children[i], listTable);
                break;
            }
        }

        return;
    }
    var isFinded = false;

    for (var i = 0; i < listTable.children.length; ++i) {
        if (listTable.children[i].children[0].innerText == name) {
            listTable.children[i].children[1].innerText = value;
            isFinded = true;
            break;
        }
    }
    if (!isFinded) {
        addTableRow(name, value);
    }
}
// Обработка фильтр-инпута
filterNameInput.addEventListener('keyup', function() {
    if (cookieArray.length == 0 || typeof cookieArray[0] != 'object') {
        buildCookieArray();
    }

    for (var i = 0; i < cookieArray.length; ++i) {
        updateCookieList(cookieArray[i].name, cookieArray[i].value);
    }
    console.log(cookieArray);
});
// Обработка добавления куки
addButton.addEventListener('click', () => {
    if (addNameInput.value.length != 0 && addValueInput.value.length != 0) {
        addCookie(addNameInput.value, addValueInput.value);
        updateCookieArray(addNameInput.value, addValueInput.value);
        updateCookieList(addNameInput.value, addValueInput.value);
        console.log(cookieArray);
    }
});
filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
