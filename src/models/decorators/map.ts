import 'reflect-metadata';
import { ConvertFunc } from '../../helper';

export const mapPropertyKey = Symbol('mapPropertyKey');

export interface PropertyData {
  [propertyKey: string]: {
    mappingKey: string;
    convertFunc?: ConvertFunc<any> ;
  };
}
export const mapProperty = <T>(
  mapKey: string,
  convertFunc?: ConvertFunc<T | T[]>
): PropertyDecorator => {
  return (target: any, propertyKey: string) => {
    const mapDatas: PropertyData =
      Reflect.getOwnMetadata(mapPropertyKey, target) || {};
    if (!(propertyKey in mapDatas)) {
      mapDatas[propertyKey] = {
        mappingKey: mapKey,
        convertFunc: convertFunc,
      };
    }

    Reflect.defineMetadata(mapPropertyKey, mapDatas, target);
  };
};
