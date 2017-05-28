/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest(),
            params = [
                'GET',
                'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
            ];

        req.open(params[0], params[1]);
        req.onload = function() {
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
            resolve(data.sort(cmpFn));
        };
        req.send();
    });
}

export { delayPromise, loadAndSortTowns };
