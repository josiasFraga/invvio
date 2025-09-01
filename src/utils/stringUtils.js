import moment from "moment";

// Definindo a função ucfirst
const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const calcYearsOld = (birthDate) => {
    const nascimento = moment(birthDate);
    const anos = moment().diff(nascimento, 'years');
    const meses = moment().diff(nascimento, 'months');

    const idadeTexto = anos > 0
        ? `${anos} ${anos === 1 ? 'ano' : 'anos'}`
        : `${meses} ${meses === 1 ? 'mês' : 'meses'}`;

    return `${nascimento.format('DD/MM/YYYY')} (${idadeTexto})`;
};

const convertToMoney = (value) => {
    const number = Number(value);

    if (isNaN(number) || number === null) {
        return 'R$ 0,00';
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(number);
};

const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

// Exportando a função de forma nomeada
export { ucFirst, calcYearsOld, convertToMoney, formatNumber };
