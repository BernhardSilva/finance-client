export const stringToDollar = (stringToDollar: string): number =>
	typeof stringToDollar === 'string'
		? Number(stringToDollar.replace(/[^0-9.]/g, ''))
		: stringToDollar;

export const numberToDollarString = (numberValue: any): string =>
	typeof numberValue === 'string'
		? numberValue
		: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numberValue);

export const numberToIntegerDollarString = (numberValue: number): string => {
	return `$${numberValue.toLocaleString()}`
};
