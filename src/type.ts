declare interface Array<T> {
  /**
   * 获取数组第一个元素
   */
  first(this: T[]): T;
  /**
   * 获取数组最后一个元素
   */
  last(this: T[]): T;
  /**
   * 通过索引移除元素
   * @parpam index：索引
   */
  removeAt(this: T[], index: number): void;
  /**
   * 移除指定元素
   * @parpam item：需要移除得元素
   */
  remove(this: T[], item: T): void;

  /**
   * 从集合中移除匹配的元素
   *
   * Removes the matching element from the collection
   */
  removeFind(
    this: T[],
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): void;
}
Array.prototype.first = function <T>(this: T[]): T {
  return this[0];
};

Array.prototype.last = function <T>(this: T[]): T {
  return this[this.length - 1];
};

Array.prototype.removeAt = function <T>(this: T[], index: number) {
  if (index > -1) this.splice(index, 1);
};

Array.prototype.remove = function <T>(this: T[], item: T) {
  const index = this.indexOf(item);
  if (index > -1) {
    this.splice(index, 1);
  }
};

Array.prototype.removeFind = function <T>(
  this: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  thisArg?: any
) {
  const index = this.findIndex(predicate, thisArg);
  if (index > -1) {
    this.splice(index, 1);
  }
};

declare interface Number {
  toThousands(this: number): string;
}
Number.prototype.toThousands = function splitThousandSeparator(
  this: number
): string {
  let num: number = this;
  let prefix = '';
  if (num < 0) {
    num *= -1;
    prefix = '-';
  }
  const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  const str: string = num
    .toString()
    .replace(DIGIT_PATTERN, m => m.replace(MILI_PATTERN, ','));
  return prefix + str;
};

// declare interface Console {
//   vlog(this: Console, message?: any, ...optionalParams: any[]): void;
// }

// console.Console.prototype.vlog = function (
//   this: Console,
//   message?: any,
//   ...optionalParams: any[]
// ) {
//   this.debug(`%c ${message}`,'background-color:red;', optionalParams);
// };
