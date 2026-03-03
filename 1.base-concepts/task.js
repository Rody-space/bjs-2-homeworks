"use strict";

/**
 * Функция для решения квадратного уравнения ax² + bx + c = 0
 * @param {number} a - коэффициент при x²
 * @param {number} b - коэффициент при x
 * @param {number} c - свободный член
 * @returns {number[]} массив корней уравнения (0, 1 или 2 элемента)
 */
function solveEquation(a, b, c) {
    // Вычисляем дискриминант
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

/**
 * Функция для расчёта общей суммы выплат по ипотеке
 * @param {number} percent - годовая процентная ставка (от 0 до 100)
 * @param {number} contribution - сумма первоначального взноса
 * @param {number} amount - общая сумма кредита
 * @param {number} countMonths - срок кредита в месяцах
 * @returns {number} общая сумма, которую заплатит клиент (округлено до 2 знаков)
 */
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    // Валидация входных данных
    if (
        typeof percent !== 'number' ||
        typeof contribution !== 'number' ||
        typeof amount !== 'number' ||
        typeof countMonths !== 'number' ||
        percent <= 0 ||
        contribution < 0 ||
        amount <= 0 ||
        countMonths <= 0
    ) {
        return 0;
    }

    // Месячная процентная ставка (в долях единицы)
    const monthlyRate = (percent / 100) / 12;

    // Тело кредита: сумма, которую нужно вернуть банку
    const loanAmount = amount - contribution;

    // Если кредит полностью покрыт взносом — клиент ничего не должен
    if (loanAmount <= 0) {
        return 0; // Исправлено: возвращаем 0, а не contribution
    }

    // Аннуитетный платёж по формуле:
    // Платёж = S * (P * (1 + P)^n) / ((1 + P)^n - 1)
    const payment = loanAmount * (
        (monthlyRate * Math.pow(1 + monthlyRate, countMonths)) /
        (Math.pow(1 + monthlyRate, countMonths) - 1)
    );

    // Общая сумма выплат по кредиту (без учёта взноса)
    const totalPayment = payment * countMonths;

    // Итоговая сумма: только выплаты по кредиту
    // Взнос уже учтён в loanAmount, повторно его не добавляем!
    const totalAmount = totalPayment;

    // Округляем до двух знаков после запятой и возвращаем число
    return Number(totalAmount.toFixed(2));
}

// Экспортируем функции (если используется модуль)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveEquation,
        calculateTotalMortgage
    };
}
