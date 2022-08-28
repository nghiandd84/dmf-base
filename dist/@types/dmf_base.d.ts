declare module "dmf_base/services/logger-service" {
    const _default: {
        log: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
    export default _default;
}
declare module "dmf_base/helper/http.helper" {
    export class HttpHelper {
        static objectToHttpParams(object: any): HttpParams;
    }
    export class CustomHttpParameterCodex implements HttpParameterCodec {
        decodeKey(key: string): string;
        decodeValue(value: string): string;
        encodeKey(key: string): string;
        encodeValue(value: string): string;
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A codec for encoding and decoding parameters in URLs.
     *
     * Used by `HttpParams`.
     *
     * @publicApi
     **/
    export interface HttpParameterCodec {
        encodeKey(key: string): string;
        encodeValue(value: string): string;
        decodeKey(key: string): string;
        decodeValue(value: string): string;
    }
    /**
     * Provides encoding and decoding of URL parameter and query-string values.
     *
     * Serializes and parses URL parameter keys and values to encode and decode them.
     * If you pass URL query parameters without encoding,
     * the query parameters can be misinterpreted at the receiving end.
     *
     *
     * @publicApi
     */
    export class HttpUrlEncodingCodec implements HttpParameterCodec {
        /**
         * Encodes a key name for a URL parameter or query-string.
         * @param key The key name.
         * @returns The encoded key name.
         */
        encodeKey(key: string): string;
        /**
         * Encodes the value of a URL parameter or query-string.
         * @param value The value.
         * @returns The encoded value.
         */
        encodeValue(value: string): string;
        /**
         * Decodes an encoded URL parameter or query-string key.
         * @param key The encoded key name.
         * @returns The decoded key name.
         */
        decodeKey(key: string): string;
        /**
         * Decodes an encoded URL parameter or query-string value.
         * @param value The encoded value.
         * @returns The decoded value.
         */
        decodeValue(value: string): string;
    }
    /**
     * Options used to construct an `HttpParams` instance.
     *
     * @publicApi
     */
    export interface HttpParamsOptions {
        /**
         * String representation of the HTTP parameters in URL-query-string format.
         * Mutually exclusive with `fromObject`.
         */
        fromString?: string;
        /** Object map of the HTTP parameters. Mutually exclusive with `fromString`. */
        fromObject?: {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
        /** Encoding codec used to parse and serialize the parameters. */
        encoder?: HttpParameterCodec;
    }
    /**
     * An HTTP request/response body that represents serialized parameters,
     * per the MIME type `application/x-www-form-urlencoded`.
     *
     * This class is immutable; all mutation operations return a new instance.
     *
     * @publicApi
     */
    export class HttpParams {
        private map;
        private encoder;
        private updates;
        private cloneFrom;
        constructor(options?: HttpParamsOptions);
        /**
         * Reports whether the body includes one or more values for a given parameter.
         * @param param The parameter name.
         * @returns True if the parameter has one or more values,
         * false if it has no value or is not present.
         */
        has(param: string): boolean;
        /**
         * Retrieves the first value for a parameter.
         * @param param The parameter name.
         * @returns The first value of the given parameter,
         * or `null` if the parameter is not present.
         */
        get(param: string): string | null;
        /**
         * Retrieves all values for a  parameter.
         * @param param The parameter name.
         * @returns All values in a string array,
         * or `null` if the parameter not present.
         */
        getAll(param: string): string[] | null;
        /**
         * Retrieves all the parameters for this body.
         * @returns The parameter names in a string array.
         */
        keys(): string[];
        /**
         * Appends a new value to existing values for a parameter.
         * @param param The parameter name.
         * @param value The new value to add.
         * @return A new body with the appended value.
         */
        append(param: string, value: string | number | boolean): HttpParams;
        /**
         * Constructs a new body with appended values for the given parameter name.
         * @param params parameters and values
         * @return A new body with the new value.
         */
        appendAll(params: {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        }): HttpParams;
        /**
         * Replaces the value for a parameter.
         * @param param The parameter name.
         * @param value The new value.
         * @return A new body with the new value.
         */
        set(param: string, value: string | number | boolean): HttpParams;
        /**
         * Removes a given value or all values from a parameter.
         * @param param The parameter name.
         * @param value The value to remove, if provided.
         * @return A new body with the given value removed, or with all values
         * removed if no value is specified.
         */
        delete(param: string, value?: string | number | boolean): HttpParams;
        /**
         * Serializes the body to an encoded string, where key-value pairs (separated by `=`) are
         * separated by `&`s.
         */
        toString(): string;
        private clone;
        private init;
    }
}
declare module "dmf_base/helper/convert" {
    export type ConvertFunc<T> = (data: any, format?: any) => T | T[];
    export const convertToInt: ConvertFunc<number>;
    export const convertToString: ConvertFunc<string>;
    export const convertToDate: (format?: string) => ConvertFunc<Date>;
    export const converToResource: <T extends any>(type: new () => T, isArray?: boolean) => ConvertFunc<T | T[]>;
}
declare module "dmf_base/helper" {
    export * from "dmf_base/helper/convert";
    export * from "dmf_base/helper/http.helper";
}
declare module "dmf_base/models/decorators/map" {
    import 'reflect-metadata';
    import { ConvertFunc } from "dmf_base/helper";
    export const mapPropertyKey: unique symbol;
    export interface PropertyData {
        [propertyKey: string]: {
            mappingKey: string;
            convertFunc?: ConvertFunc<any>;
        };
    }
    export const mapProperty: <T>(mapKey: string, convertFunc?: ConvertFunc<T | T[]>) => PropertyDecorator;
}
declare module "dmf_base/models/decorators/index" {
    export * from "dmf_base/models/decorators/map";
}
declare module "dmf_base/models/resource.model" {
    import 'reflect-metadata';
    export class ResourceModel {
        id?: string | number;
        constructor(...args: any[]);
        assign(jsonObj: Object): void;
    }
}
declare module "dmf_base/models" {
    export * from "dmf_base/models/resource.model";
    export * from "dmf_base/models/decorators/index";
}
declare module "dmf_base/services/crud.service" {
    import { Observable } from 'rxjs';
    import { AxiosInstance } from 'axios';
    import { ResourceModel } from "dmf_base/models";
    export abstract class ApiBaseService {
        apiUrl?: string;
        resourcePath?: string;
        protected httpClient: AxiosInstance;
        basePath(): string;
        constructor(apiUrl?: string, resourcePath?: string);
    }
    export class CrudBaseService<T extends ResourceModel> {
        protected httpClient: AxiosInstance;
        protected apiUrl?: string;
        protected resourcePath?: string;
        protected resourceModel?: T;
        constructor(apiUrl?: string, resourcePath?: string);
        basePath(): string;
        get(id: string): Observable<T>;
        filter(filterParams: any): Observable<T[]>;
        create(model: T): Observable<any>;
        update(id: string, model: T): Observable<any>;
        delete(id: string): Observable<any>;
    }
}
declare module "dmf_base/services" {
    import * as logger from "dmf_base/services/logger-service";
    const _default_1: {
        logger: typeof logger;
    };
    export default _default_1;
    export * from "dmf_base/services/crud.service";
}
