export const generateSlug = (name: string): string => {
  const nameArr = name.split(' ');
  const trimmedNameArr = [];

  for (let val of nameArr) {
    if (val) {
      trimmedNameArr.push(val.trim());
    }
  }

  return trimmedNameArr.join('_').toLowerCase();
}