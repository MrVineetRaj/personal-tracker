import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useFetchObject = (fn) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArray();
  }, []);

  const fetchArray = async () => {
    setIsLoading;
    try {
      const res = await fn();
      

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

export default useFetchObject;
