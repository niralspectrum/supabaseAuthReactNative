import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieves a value from AsyncStorage using the specified key.
 */
export const getStoredValue = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error retrieving data from storage:', error);
    return null;
  }
};

/**
 * Stores a value in AsyncStorage with the specified key.
 */
export const saveToStorage = async (
  key: string,
  value: any,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving data to storage:', error);
    return false;
  }
};

/**
 * Removes a specific value from AsyncStorage.
 */
export const removeFromStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data from storage:', error);
    return false;
  }
};

/**
 * Clears all stored data in AsyncStorage.
 */
export const clearAllStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};
