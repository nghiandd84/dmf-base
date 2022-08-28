export interface ObjectComparison {
  added: {};
  updated: {
    [propName: string]: Change;
  };
  removed: {};
  unchanged: {};
}
export interface Change {
  oldValue: any;
  newValue: any;
}

export const isFunction = (obj: any) => {
  return {}.toString.apply(obj) === '[object Function]';
};

export const isArray = (obj: any) => {
  return {}.toString.apply(obj) === '[object Array]';
};

export const isObject = (obj: any) => {
  return {}.toString.apply(obj) === '[object Object]';
};

export const isDate = (obj: any) => {
  return {}.toString.apply(obj) === '[object Date]';
};

export const isValue = (obj: any) => {
  return !isObject(obj) && !isArray(obj);
};

/**
 * diff(
  {
    a: 'a', 
    b: 'b', 
    c: 'c', 
    arr: ['A', 'B'], 
    obj: {p1: 'p1', p2: 'p2'}
  },
  {
    b: 'x', 
    c: 'c', 
    arr: ['B', 'C'], 
    obj: {p2: 'p2', p3: 'p3'}, 
    d: 'd'
  },
);@Return {
  added: {d: 'd'},
  updated: {
    b: {oldValue: 'b', newValue: 'x'},
    arr: {oldValue: ['A', 'B'], newValue: ['B', 'C']},
    obj: {oldValue: {p1: 'p1', p2: 'p2'}, newValue: {p2: 'p2', p3: 'p3'}}
  },
  removed: {a: 'a'},
  unchanged: {c: 'c'},
}
 */
export const diff = (
  o1: any = {},
  o2: any = {},
  deep = false
): ObjectComparison => {
  const added = {};
  const updated = {};
  const removed = {};
  const unchanged = {};
  for (const prop in o1) {
    if (o1.hasOwnProperty(prop)) {
      const o2PropValue = o2[prop];
      const o1PropValue = o1[prop];
      if (o2.hasOwnProperty(prop)) {
        if (o2PropValue === o1PropValue) {
          unchanged[prop] = o1PropValue;
        } else {
          updated[prop] =
            deep && isObject(o1PropValue) && isObject(o2PropValue)
              ? diff(o1PropValue, o2PropValue, deep)
              : { newValue: o2PropValue };
        }
      } else {
        removed[prop] = o1PropValue;
      }
    }
  }
  for (const prop in o2) {
    if (o2.hasOwnProperty(prop)) {
      const o1PropValue = o1[prop];
      const o2PropValue = o2[prop];
      if (o1.hasOwnProperty(prop)) {
        if (o1PropValue !== o2PropValue) {
          if (!deep || !isObject(o1PropValue)) {
            updated[prop].oldValue = o1PropValue;
          }
        }
      } else {
        added[prop] = o2PropValue;
      }
    }
  }
  return { added, updated, removed, unchanged };
};
