export const isRequiredFieldsPassed = (obj, fields, type) => {
  if (type === 'eq') {
    return Object.keys(obj).length === fields && Object.values(obj).every((elt) => elt !== '');
  }

  return false;
};

export const calculateTime = (date) => {
  if (date) {
    const now = new Date();
    const previous = new Date(date);
    if (now.getFullYear() === previous.getFullYear()) {
      if (now.getMonth() === previous.getMonth()) {
        const res = now.getDate() - previous.getDate();
        let message = "";

        if (res === 0) message = "Today";
        else if (res === 1) message = "Yesterday";
        else message = "days ago";
        return `${res > 1 ? res : ""} ${message}`;
      } else {
        const res = now.getMonth() - previous.getMonth();
        return `${res} ${res === 1 ? "month" : "months"} ago`;
      }
    } else {
      const monthInterval = 12 - previous.getMonth() + now.getMonth();
      if (monthInterval < 12) {
        return `${monthInterval} ${
          monthInterval === 1 ? "month" : "months"
        } ago`;
      }
      const res = now.getFullYear() - previous.getFullYear();
      return `${res} ${res === 1 ? "year" : "years"} ago`;
    }
  }
};
