import {resetUserData, setUserTokens} from "../Redux/slices/userSlice";
import store from "../Redux/store";
import enStrings from "../locales/en.json";
import {axiosClient} from "../libs/axiosClient";
import PDFFile from "../Assets/images/pdf_image.png";
import DocFile from "../Assets/images/docx_image.png";
import OtherFile from "../Assets/images/other_image.png";
import ExcelFile from "../Assets/images/xls-file.png";

const enTrans = enStrings;


export const isRequiredFieldsPassed = (obj, fields, type) => {
    if (type === "eq") {
        return (
            Object.keys(obj).length === fields &&
            Object.values(obj).every((elt) => elt !== "")
        );
    } else if (type === "gt") {
        return (
            Object.keys(obj).length >= fields.length &&
            fields.every((elt) => Object.keys(obj).includes(elt) && obj[elt] !== "")
        );
    }

    return false;
};

export const isRequiredFieldValuesPassed = (obj, fields, type) => {
    if (type === "eq") {
        Object.values(obj).every((elt) => elt !== "");
        return (
            fields.every((elt) => Object.keys(obj).includes(elt)) &&
            Object.values(obj).every((elt) => elt !== "")
        );
    }

    return false;
};

export const calculateTime = (date) => {
    if (date) {
        const now = new Date();
        const previous = new Date(date);
        const timeDiff = now.getTime() - previous.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (daysDiff < 7) {
            if (daysDiff === 0) {
                return "Today";
            } else if (daysDiff === 1) {
                return "Yesterday";
            } else {
                return `${daysDiff} days ago`;
            }
        } else if (daysDiff < 30) {
            return "Last week";
        } else if (now.getFullYear() === previous.getFullYear()) {
            const monthDiff = now.getMonth() - previous.getMonth();
            return `${monthDiff} ${monthDiff === 1 ? "month" : "months"} ago`;
        } else {
            const yearDiff = now.getFullYear() - previous.getFullYear();
            return `${yearDiff} ${yearDiff === 1 ? "year" : "years"} ago`;
        }
    }
};

export const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "tiff",
    "bmp",
    "svg",
    "raw",
    "webp",
];


export const isDocumentImage = (file) => {
    const splittedName = file?.split(".");
    return imageExtensions?.includes((splittedName[splittedName.length - 1])?.toLowerCase());
};

export const getUserData = () => {
    return store.getState().user.tokens;
};

export const setUserTokenData = (token) => {
    store.dispatch(setUserTokens(token));
};

export const resetUserInfo = () => {
    store.dispatch(resetUserData());
};

export const formatDateWithBar = (date, spaced) => {
    const dateNow = date.toString().split(" ");
    const monthDay = dateNow[1] + " " + dateNow[2];
    let time = dateNow[4].split(":");
    let hour = time[0];

    const ampm = parseInt(hour) >= 12 ? "pm" : "am";
    hour %= 12;
    hour = hour || 12;

    return `${monthDay}, ${dateNow[3]} ${spaced ? " " : "|"} ${hour}:${
        time[1]
    } ${ampm}`;
};

export const convertToSnakeCase = (inputString) => {
    return inputString.toLowerCase().replace(/\s+/g, "_");
};

export const getImageUrl = (url) => {
    return `${process.env.REACT_APP_BACKEND_DOMAIN}${url}`;
};

export const getInitials = (firstName, lastName) => {
    if (firstName && lastName) {
        return firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase();
    }

    return ''
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const replaceNullWithEmptyString = (obj) => {
    // Base case: If the object is null, return an empty string
    if (obj === null || obj === "null") {
        return "";
    }

    // If the object is an object, recursively process each property
    if (typeof obj === "object") {
        const newObj = {};

        Object.entries(obj).forEach(([key, value]) => {
            newObj[key] = replaceNullWithEmptyString(value);
        });

        return newObj;
    }

    // If the object is neither an array nor an object, return the value as is
    return obj;
}

// Table Field translation strings
export const getTransString = (field) => {
    let selectedKey = "";
    Object.keys(enTrans).some((parentKey) => {
        const childKey = Object.keys(enTrans[parentKey]).find((key) => {
            return enTrans[parentKey][key] === field;
        });
        if (childKey) {
            selectedKey = parentKey + "." + childKey;
            return true;
        }
    });

    return selectedKey;
};

// Format Date
export const formatDate = (date) => {
    if (date) {
        const newDate = new Date(date);
        const monthStr = `${newDate}`.split(" ")[1];
        return monthStr + " " + newDate.getDate() + ", " + newDate.getFullYear();
    }

    return "Not specified";
};

export const sortDataByOrder = (data, type, order) => {
    const dataToSort = [...data];
    dataToSort.sort((a, b) => {
        const itemA = a[type];
        const itemB = b[type];
        if (itemA < itemB) {
            return order === "reverse" ? 1 : -1;
        }
        if (itemA > itemB) {
            return order === "reverse" ? -1 : 1;
        }
        return 0;
    });
    return dataToSort;
};

export const cleanMessageDate = (timestamp) => {
    const splittedDate = timestamp?.split(" ");
    if (splittedDate?.length > 1) {
        const secondSplit = splittedDate[1]?.split("+");
        return splittedDate[0] + "T" + secondSplit[0] + "Z";
    }

    return splittedDate[0];
};
export const formatMessageTime = (timestamp) => {
    if (timestamp) {
        const messageDate = new Date(cleanMessageDate(timestamp));
        const currentDate = new Date();

        // Check if the message was sent today
        if (
            messageDate.getDate() === currentDate.getDate() &&
            messageDate.getMonth() === currentDate.getMonth() &&
            messageDate.getFullYear() === currentDate.getFullYear()
        ) {
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        } else {
            // Check if the message was sent yesterday
            const yesterday = new Date();
            yesterday.setDate(currentDate.getDate() - 1);
            if (
                messageDate.getDate() === yesterday.getDate() &&
                messageDate.getMonth() === yesterday.getMonth() &&
                messageDate.getFullYear() === yesterday.getFullYear()
            ) {
                return 'Yesterday';
            } else {
                // Format the message date in a long format
                return messageDate.toLocaleDateString();
            }
        }
    }

    return timestamp;
};

export const shareBlog = async (e, props) => {
    e.stopPropagation();
    const url = `https://sema.africanchildprojects.org/blog/${props.id}`
    let shareData = {
        title: props.title,
        text: props.preview_text,
        url,
    };


    if (!navigator.canShare) {
        console.log("navigator.canShare() not supported.");
    } else if (navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            await axiosClient.put(`/blog/share-blog-post/${props.id}/`)
            props.setRefetch((prev) => !prev);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    } else {
        console.log("Specified data cannot be shared.");
    }
}


export const returnFileFormat = (fileType) => {
    if (fileType === ".pdf") {
        return PDFFile;
    } else if (fileType === ".docx" || fileType === ".doc") {
        return DocFile;
    } else if (fileType === ".xlsx" || fileType === ".xls") {
        return ExcelFile;
    } else {
        return OtherFile;
    }
}

// handle download file
export const handleDownload = (fileUrl) => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileUrl;
    a.click();
};

export const goToImage = (fileUrl) => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.target = "_blank";
    a.click();
}


String.prototype.truncate = function (n) {
    return this.substring(0, n - 1) + (this.length > n ? "..." : "");
}
