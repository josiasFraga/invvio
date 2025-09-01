export const maskMoney = (text) => {
	// Remove caracteres não numéricos
	let cleaned = text.replace(/\D/g, '');

	// Converte para um valor numérico e limita a entrada
	let number = parseFloat(cleaned) / 100;

	// Formata o número para o padrão de moeda brasileira
	if (isNaN(number)) return '';

	return number.toLocaleString('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	});
};

export const maskMoneyTwo = (text) => {
	// Remove caracteres não numéricos
	let cleaned = text.replace(/\D/g, '');

	// Converte para um valor numérico e limita a entrada
	let number = parseFloat(cleaned) / 100;

	// Formata o número para o padrão de moeda brasileira
	if (isNaN(number)) return '';

	return new Intl.NumberFormat('pt-BR', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
	}).format(number);
};

export const maskPhone = (text) => {
	// Remove caracteres não numéricos
	let cleaned = text.replace(/\D/g, '');

	// Aplica a máscara com base no número de dígitos
	let match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

	if (!match) return '';

	// Monta o telefone formatado
	let formatted = '';
	if (match[1]) formatted += `(${match[1]}`;// Código de área: (XX
	if (match[2]) formatted += `) ${match[2]}`;// Prefixo: (XX) XXXXX
	if (match[3]) formatted += `-${match[3]}`; // Sufixo: (XX) XXXXX-XXXX

	return formatted;
};

export const maskCPF = (text) => {
	return text
	.replace(/\D/g, '') // Remove qualquer caractere que não seja número
	.slice(0, 11) // Limita a entrada a 11 dígitos
	.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
	.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
	.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço final
};

export const maskTime = (text) => {
	// Remove caracteres não numéricos
	let cleanText = text.replace(/\D/g, '');

	// Garante que a entrada tenha no máximo 4 dígitos (HHMM)
	cleanText = cleanText.substring(0, 4);

	let hours = cleanText.substring(0, 2); // HH
	let minutes = cleanText.substring(2, 4); // MM

	// Validação das horas (0-23)
	if (hours && parseInt(hours) > 23) {
	hours = '23';
	}

	// Validação dos minutos (0-59)
	if (minutes && parseInt(minutes) > 59) {
	minutes = '59';
	}

	// Monta o retorno formatado no padrão HH:MM
	if (cleanText.length <= 2) {
	return hours; // Se o usuário estiver digitando apenas as horas
	} else {
	return `${hours}:${minutes}`;
	}
};

export const maskCNPJ = (text) => {
	// Remove tudo que não for número
	let cleaned = text.replace(/\D/g, '');

	// Aplica a máscara somente se o usuário estiver inserindo, não apagando
	let masked = '';
	
	if (cleaned.length > 0) masked += cleaned.substring(0, 2); // XX
	if (cleaned.length > 2) masked += '.' + cleaned.substring(2, 5); // XX.XXX
	if (cleaned.length > 5) masked += '.' + cleaned.substring(5, 8); // XX.XXX.XXX
	if (cleaned.length > 8) masked += '/' + cleaned.substring(8, 12); // XX.XXX.XXX/XXXX
	if (cleaned.length > 12) masked += '-' + cleaned.substring(12, 14); // XX.XXX.XXX/XXXX-XX

	return masked;
};

export const maskCEP = (text) => {
	// Remove caracteres não numéricos
	let cleaned = text.replace(/\D/g, '');

	// Garante no máximo 8 dígitos
	cleaned = cleaned.slice(0, 8);

	// Aplica a máscara somente quando necessário
	let formatted = cleaned;

	if (cleaned.length > 5) {
	formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
	}

	return formatted;
};

export const maskNumber = (text) => {
	return text.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
}

export const maskCCExpiry = (text) => {
	// Remove caracteres não numéricos
	let cleaned = text.replace(/\D/g, '');

	// Garante que o valor tenha no máximo 4 dígitos
	cleaned = cleaned.slice(0, 4);

	// Aplica a máscara no formato MM/YY
	let formatted = cleaned;

	if (cleaned.length > 2) {
	formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
	}

	return formatted;
};

export const maskPhoneUy = (text) => {
	let retorno = text.replace(/\D/g, '');
	return retorno;
}

export const maskDecimal = (text) => {
	// Remove tudo que não for número, vírgula ou ponto
	let cleaned = text.replace(/[^0-9.,]/g, '');
  
	// Substitui ponto por vírgula
	cleaned = cleaned.replace(/\./g, ',');
  
	// Se houver mais de uma vírgula, mantém só a primeira
	const firstCommaIndex = cleaned.indexOf(',');
	if (firstCommaIndex !== -1) {
	  const integerPart = cleaned.slice(0, firstCommaIndex);
	  const decimalPartRaw = cleaned.slice(firstCommaIndex + 1).replace(/,/g, '');
	  const decimalPart = decimalPartRaw.slice(0, 2); // até 2 casas decimais
  
	  return `${integerPart},${decimalPart}`;
	}
  
	return cleaned;
};
  