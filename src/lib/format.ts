const pad = (n: number) => String(n).padStart(2, '0');

/** Numbering of sheets, "01 / 06" (docs/komunikacja.md#zasady-pisania). */
export function sheetNumber(position: number, total: number) {
  return `${pad(position)} / ${pad(total)}`;
}
