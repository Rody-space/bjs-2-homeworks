"use strict";

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    // Проверяем входные данные
    if (percent <= 0 || contribution < 0 || amount <= 0 || countMonths <= 0) {
        return 0;
    }

    // Преобразуем процентную ставку: из % в долю, из годовой в месячную
    const monthlyRate = (percent / 100) / 12;

    // Тело кредита (сумма, которую нужно вернуть банку)
    const loanAmount = amount - contribution;

    // Если тело кредита <= 0, клиент ничего не должен
    if (loanAmount <= 0) {
        return Number(contribution.toFixed(2));
    }

    // Ежемесячный платёж по формуле:
    // Платёж = S * (P + (P / (((1 + P)^n) - 1)))
    const payment = loanAmount * (
        monthlyRate + (monthlyRate / (Math.pow(1 + monthlyRate, countMonths) - 1))
    );

    // Общая сумма выплат (ежемесячный платёж * количество месяцев)
    const totalPayment = payment * countMonths;

    // Итоговая сумма: первоначальный взнос + общая сумма выплат по кредиту
    const totalAmount = contribution + totalPayment;

    // Округляем до двух знаков после запятой и возвращаем число
    return Number(totalAmount.toFixed(2));
}
