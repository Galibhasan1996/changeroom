import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
    id: "user_storage",
    encryptionKey: "user_storage_key"
});

export const UserStorage = {
    setItem: (key, value) => {
        // Convert objects/arrays to JSON before storing
        const storedValue = typeof value === "boolean" || typeof value === "object"
            ? JSON.stringify(value)
            : value;
        storage.set(key, storedValue);
    },

    getItem: (key) => {
        const value = storage.getString(key);
        if (!value) return null;

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    },

    removeItem: (key) => {
        storage.delete(key);
    },

    clearAll: () => {
        storage.clearAll();
    }
};
