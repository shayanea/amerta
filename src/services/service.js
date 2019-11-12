import AsyncStorage from '@react-native-community/async-storage';

export const getUser = async () => {
  try {
    let result = await AsyncStorage.getItem('@profile');
    if (result !== null) {
      return (result = JSON.parse(result));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    let result = await AsyncStorage.getItem('@token');
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
