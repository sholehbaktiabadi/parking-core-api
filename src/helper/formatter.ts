export const CurrencyFmt = (n: number) => {
    const CurrencyFormatter = new Intl.NumberFormat('id', { 
        currency: "IDR",
        style: "currency",
        compactDisplay: "short",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
    return CurrencyFormatter.format(n)
}