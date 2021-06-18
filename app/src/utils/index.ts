const currencyFormatter = (selectedCurrOpt: any) => (value: any) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: selectedCurrOpt,
  }).format(value);
};

const currencyParser = (val: any) => {
  try {
    // for when the input gets clears
    if (typeof val === 'string' && !val.length) {
      val = '0.0';
    }

    // detecting and parsing between comma and dot
    let group = new Intl.NumberFormat('en-us').format(1111).replace(/1/g, '');
    let decimal = new Intl.NumberFormat('en-us').format(1.1).replace(/1/g, '');
    let reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    //  => 1232.21 €

    // removing everything except the digits and dot
    reversedVal = reversedVal.replace(/[^0-9.]/g, '');
    //  => 1232.21

    // appending digits properly
    const digitsAfterDecimalCount = (reversedVal.split('.')[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  } catch (error) {
    console.error('An error has occurred on formatter', error);
  }
};

export { currencyFormatter, currencyParser };
