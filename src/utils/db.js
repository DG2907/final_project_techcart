export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TechCartDB', 1);

    request.onerror = () => reject('Error opening DB');
    
    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: '_id' });
      }
    };
  });
};

export const saveToCartDB = async (item) => {
  const db = await initDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  store.put(item);
  return tx.complete;
};

export const getCartFromDB = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('cart', 'readonly');
    const store = tx.objectStore('cart');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error fetching cart');
  });
};

export const clearCartDB = async () => {
  const db = await initDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  store.clear();
};
