export const checkInSetter = (date: string) => {
  console.log('checkInSetter', date);
  sessionStorage.setItem('checkInDate', date);
};

export const checkInGetter = () => {
  return sessionStorage.getItem('checkInDate');
};

export const checkOutSetter = (date: string) => {
  sessionStorage.setItem('checkOutDate', date);
};

export const checkOutGetter = () => {
  return sessionStorage.getItem('checkOutDate');
};

export const countSetter = (count: number) => {
  sessionStorage.setItem('count', count.toString());
};

export const countGetter = () => {
  return sessionStorage.getItem('count');
};

export const clearStorage = () => {
  sessionStorage.clear();
};
