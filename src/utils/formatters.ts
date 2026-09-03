export function formatCurrency(amount: number | null | undefined, currency: string = '$', maximumFractionDigits = 2): string {
  if (amount === null || amount === undefined || typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
    return `${currency}0.00`;
  }
  return `${currency}${amount.toLocaleString('en-US', {
    minimumFractionDigits: maximumFractionDigits > 0 ? 2 : 0,
    maximumFractionDigits: maximumFractionDigits
  })}`;
}

export function formatNumber(num: number | null | undefined, maxDigits = 2): string {
  if (num === null || num === undefined || typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
    return '0';
  }
  return num.toLocaleString('en-US', {
    maximumFractionDigits: maxDigits
  });
}

export function formatPercent(val: number | null | undefined, maxDigits = 2): string {
  if (val === null || val === undefined || typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
    return '0%';
  }
  return `${val.toLocaleString('en-US', { maximumFractionDigits: maxDigits })}%`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve(success);
    } catch {
      return Promise.resolve(false);
    }
  }
}

export function downloadCsv(filename: string, headersOrRows: (string | number)[] | (string | number)[][], maybeRows?: (string | number)[][]): void {
  let rows: (string | number)[][] = [];
  if (maybeRows && Array.isArray(maybeRows)) {
    rows = [headersOrRows as (string | number)[], ...maybeRows];
  } else {
    rows = headersOrRows as (string | number)[][];
  }

  const processRow = (row: (string | number)[]) => {
    let finalVal = '';
    for (let j = 0; j < row.length; j++) {
      let innerValue = row[j] === null || row[j] === undefined ? '' : row[j].toString();
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ',';
      finalVal += result;
    }
    return finalVal + '\n';
  };

  let csvFile = '';
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
