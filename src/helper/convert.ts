import { ResourceModel } from 'src/models';

export type ConvertFunc<T> = (data: any, format?: any) => T | T[];
export const convertToInt: ConvertFunc<number> = (data: any): number => {
  const dataType = typeof data;
  if (dataType === 'string') {
    return parseInt(data);
  } else if (dataType === 'number') {
    return data;
  }
  return undefined;
};

export const convertToString: ConvertFunc<string> = (data: any): string => {
  const dataType = typeof data;
  if (dataType === 'string') {
    return data;
  } else if (dataType === 'number') {
    return `${data}`;
  }
  return undefined;
};

export const convertToDate =
  (format?: string): ConvertFunc<Date> =>
  (data: any): Date => {
    // TODO build format datetime from string
    console.log(format, data);
    const dataType = typeof data;
    if (dataType === 'string') {
      return new Date(Date.parse(data));
    } else if (dataType === 'number') {
      return new Date(data);
    }
    return undefined;
  };

export const converToResource = <T extends ResourceModel>(
  type: {
    new (): T;
  },
  isArray = false
): ConvertFunc<T | T[]> => {
  return (data: any): T | T[] => {
    if (isArray && Array.isArray(data)) {
      const arr: T[] = [];
      for (let item of data) {
        // TODO find by id and merge data
        const obj = new type();
        obj.assign(item);
        arr.push(obj);
      }
      return arr;
    } else if (typeof data === 'object') {
      const obj = new type();
      obj.assign(data);
      return obj;
    }
    return undefined;
  };
};
