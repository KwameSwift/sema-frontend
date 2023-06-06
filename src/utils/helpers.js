export const isRequiredFieldsPassed = (obj, fields, type) => {
  if (type === 'eq') {
    return Object.keys(obj).length === fields && Object.values(obj).every((elt) => elt !== '');
  }

  return false;
};
