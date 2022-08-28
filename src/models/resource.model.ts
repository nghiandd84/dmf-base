import 'reflect-metadata';
import { mapPropertyKey, PropertyData } from './decorators';
export class ResourceModel {
  id?: string | number;

  constructor(...args: any[]) {}
  assign(jsonObj: Object) {
    if (jsonObj['id']) {
      this.id = jsonObj['id'];
    }
    const mapData: PropertyData = Reflect.getMetadata(mapPropertyKey, this);
    for (const [key, _] of Object.entries(this)) {
      if (key in mapData) {
        const mapPropertyData = mapData[key];
        if (mapPropertyData.mappingKey in jsonObj) {
          const haveConvertFunc = !!mapPropertyData.convertFunc;
          if (haveConvertFunc) {
            const convertData = mapPropertyData.convertFunc(
              jsonObj[mapPropertyData.mappingKey]
            );
            if (typeof convertData !== 'undefined') {
              this[key] = convertData;
            }
          } else {
            this[key] = jsonObj[mapPropertyData.mappingKey];
          }
        }
      }
    }
  }

  toJSON() {
    const obj: any = {};
    if (this.id) {
      obj['id'] = this.id;
    }
    const mapData: PropertyData = Reflect.getMetadata(mapPropertyKey, this);
    for (const [key, value] of Object.entries(mapData)) {
      const mapValue = this[key];
      if (mapValue instanceof ResourceModel) {
        obj[value.mappingKey] = mapValue.toJSON();
      } else if (Array.isArray(mapValue)) {
        const arr: any[] = [];
        for (const item of mapValue) {
          if (item instanceof ResourceModel) {
            arr.push(item.toJSON());
          }
        }
        obj[value.mappingKey] = arr;
      } else {
        obj[value.mappingKey] = mapValue;
      }
    }
    return obj;
  }
}
