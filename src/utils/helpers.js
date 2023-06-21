import { setUserTokens } from '../Redux/slices/userSlice';
import store from '../Redux/store';


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


export const isDocumentImage = (documents) => {
  const image = documents?.find((file) => {
    const splittedName = file?.document_location?.split(".");
    const imageExtensions = ["jpg", "jpeg", "png", "webp"];
  
    return imageExtensions?.includes(splittedName[splittedName.length - 1])
  });
  return image || {};
}

export const getUserData = () => {
  return store.getState().user.tokens
}


export const setUserTokenData = (token) => {
  store.dispatch(setUserTokens(token));
}

export const formatDateWithBar = (date, spaced) => {
  const dateNow = date.toString().split(" ")
  const monthDay = dateNow[1] + " " + dateNow[2]
  let time = dateNow[4].split(":")
  let hour = time[0]

  const ampm = parseInt(hour) >= 12 ? 'pm' : 'am';
  hour %= 12
  hour = hour || 12

  return `${monthDay}, ${dateNow[3]} ${spaced ? " " : "|" } ${hour}:${time[1]} ${ampm}`
}

export const convertToSnakeCase = (inputString) => {
  return inputString.toLowerCase().replace(/\s+/g, '_');
}

export const getImageUrl = (url) => {
  return `${process.env.REACT_APP_BACKEND_DOMAIN}${url}`
}