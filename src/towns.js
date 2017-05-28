/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function showBtn() {
    var button = document.createElement('button');

    button.textContent = 'Повторить';
    button.addEventListener('click', () => {
        townsPromise = loadTowns();
    });
    loadingBlock.innerHTML = 'Не удалось загрузить города';
    loadingBlock.appendChild(button);
}
function loadTowns() {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest(),
            params = [
                'GET',
                'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
            ];

        req.open(params[0], params[1]);
        req.onload = function() {
            if (req.status != 200) {
                showBtn();
            } else {
                var data = JSON.parse(req.responseText);

                function cmpFn(a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                }
                filterBlock.style.display = 'block';
                resolve(data.sort(cmpFn));
            }
        };
        req.send();
    });
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    var reg = new RegExp(chunk, 'i'), 
        res;

    res = full.search(reg);

    if (res < 0) {
        return false;
    }

    return true;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns();

filterInput.addEventListener('keyup', function() {
    if (filterInput.value.length == 0) {
        filterResult.innerHTML = '';
    } else {
        townsPromise.then(function(value) {
            filterResult.innerHTML = '';
            var el;

            for (var i = 0; i < value.length; ++i) {
                if (isMatching(value[i].name, filterInput.value)) {
                    el = document.createElement('p');
                    el.textContent = value[i].name;
                    filterResult.appendChild(el);
                }
            }
        });
    }
});

export { loadTowns, isMatching };
