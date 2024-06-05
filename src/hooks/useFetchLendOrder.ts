import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { formatNumber } from "../components/GlobalFunctions";

interface LendOrderData {
  id: number;
  poolId: number;
  buyPrice: number;
  deposits: number;
  lendingRate: number;
  borrowingRate: number;
  utilizationRate: number;
  borrows: number;
  availableSupply: number;
  [key: string]: string | number;
}

export const useFetchLendOrder = (
  contract: ethers.Contract,
  poolIds: number[]
) => {
  const [data, setData] = useState<LendOrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    try {
      const genesisPoolId = 1111111110;
      const results = await Promise.all(
        poolIds.map(async (poolId) => {
          // Fetch data from the API
          const apiResponses = await Promise.all([
            axios.get(`/v1/request/pools/${poolId}`),
            axios.get(`/v1/request/viewLendingRate/${poolId}`),
            axios.get(`/v1/request/viewUtilizationRate/${poolId}`),
            axios.get(`/v1/request/limitPrice/${poolId}`),
            axios.get(`/v1/request/viewBorrowingRate/${poolId}`),
          ]);

          const resultsAvailableAssets = apiResponses[0].data.result.split(",");
          const deposits = parseFloat(
            ethers.utils.formatUnits(resultsAvailableAssets[0], "ether")
          );
          const lendingRate =
            parseFloat(
              ethers.utils.formatUnits(apiResponses[1].data.result, "ether")
            ) * 100;
          const utilizationRate =
            parseFloat(
              ethers.utils.formatUnits(apiResponses[2].data.result, "ether")
            ) * 100;
          const buyPrice = parseFloat(
            ethers.utils.formatUnits(apiResponses[3].data.result, "ether")
          );
          const borrowingRate = parseFloat(
            ethers.utils.formatUnits(apiResponses[4].data.result, "ether")
          );
          const borrows = parseFloat(
            ethers.utils.formatUnits(resultsAvailableAssets[1], "ether")
          );

          return {
            id: poolId,
            poolId: poolId,
            buyPrice: buyPrice, //`${formatNumber(buyPrice)} USDC`,
            deposits: deposits, //`${formatNumber(availableAssets)} USDC`,
            lendingRate: lendingRate, //`${formatNumber(lendingRate)}%`,
            borrowingRate: borrowingRate,
            utilizationRate: utilizationRate, //`${utilizationRate.toFixed(2)}%`,
            mySupply: 0,
            myBorrowingPositions: 0,
            borrows: borrows,
            availableSupply: deposits - borrows,
          };
        })
      );

      setData(results);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [poolIds]);

  return { data, loading, error };
};
