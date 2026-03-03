"use strict";

function solveEquation(a, b, c) {
    // Вычисляем дискриминант по формуле D = b² - 4ac
    const d = b ** 2 - 4 * a * c;


    // Если дискриминант меньше нуля — корней нет
    if (d < 0) {
        return [];
    }

    // Если дискриминант равен нулю — один корень
    if (d === 0) {
        const root = -b / (2 * a);
        return [root];
    }

    // Если дискриминант больше нуля — два корня
    const sqrtD = Math.sqrt(d);
    const root1 = (-b + sqrtD) / (2 * a);
    const root2 = (-b - sqrtD) / (2 * a);

    return [root1, root2];
}
