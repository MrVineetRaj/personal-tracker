import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useFetchArray = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, [fn]);

  const fetchArray = async () => {
    setIsLoading;
    try {
      const res = await fn();
        console.log("from fetcharray ", res);
      //   Alert.alert("Data fetched successfully");

      setData(res);
    } catch (error) {
      Alert.alert("Error fetching data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchArray();
  };

  return { data, refetch, isLoading };
};

export default useFetchArray;
