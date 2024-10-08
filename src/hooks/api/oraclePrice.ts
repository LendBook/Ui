import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useOrderbook } from "../useOrderbook";

let apiUrl = "";
if (process.env.NODE_ENV === "development") {
  apiUrl = "";
} else {
  apiUrl = process.env.REACT_APP_API_URL || "https://api-v2-neon.vercel.app"; //"https://lendbook-api-bis.vercel.app"; //"https://api-v2-neon.vercel.app" "https://api.lendbook.org";
}

interface PriceFeedData {
  viewPriceFeed: string;
}

export const usePriceOracle = () => {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  //const { contract: bookAddress } = useOrderbook();
  const bookAddress = "0x5b0D0DDB7860eaEed42AE95b05A7d2df9877aD25";

  const fetchPrice = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/book/${bookAddress}/viewPriceFeed`
      );
      const priceData: PriceFeedData = response.data;
      //console.log("priceData.viewPriceFeed ", priceData.viewPriceFeed);
      const priceInUSDC = parseFloat(
        ethers.utils.formatUnits(priceData.viewPriceFeed, 18)
      );
      setPrice(priceInUSDC);
    } catch (err) {
      setError("Failed to fetch price data");
      //console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(() => {
      fetchPrice();
    }, 10000); // 10 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return { price, loading, error };
};
