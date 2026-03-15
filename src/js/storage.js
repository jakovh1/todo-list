const isStorageAvailable = (type) => {
  try {
    const storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
  }
};

const storage = isStorageAvailable("localStorage") ? window.localStorage : null;

export const storageHelper = {
  get: (key) => {
    if (!storage) return null;
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  },
  set: (key, value) => {
    if (!storage) return;
    storage.setItem(key, JSON.stringify(value));
  }
};