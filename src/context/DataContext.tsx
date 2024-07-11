import React, { createContext, useContext } from "react";
import { usePriceOracle } from "../hooks/api/oraclePrice";
import {
  useFetchUserInfo,
  UserDepositOrdersData,
  UserBorrowsData,
} from "../hooks/api/userInfo";
import {
  PriceForPoolIdData,
  useFetchPriceForEmptyPools,
} from "../hooks/api/emptyPools";
import { LendOrderData, useFetchLendOrder } from "../hooks/api/lend";
import { ObjectWithId, mergeObjects } from "../components/GlobalFunctions";

interface DataContextType {
  pricePoolId: PriceForPoolIdData[];
  pricePoolIdLoading: boolean;
  pricePoolIdError: string;
  orderData: LendOrderData[];
  orderLoading: boolean;
  orderError: string;
  price: number | null;
  priceLoading: boolean;
  priceError: string;
  userInfo: any;
  userDeposits: UserDepositOrdersData[];
  userBorrows: UserBorrowsData[];
  loadingUser: boolean;
  errorUser: string | null;
  orderMergedData: ObjectWithId[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
  provider: any;
  walletAddress: string | undefined;
}

export const DataProvider: React.FC<DataProviderProps> = ({
  children,
  provider,
  walletAddress,
}) => {
  const { pricePoolId, pricePoolIdLoading, pricePoolIdError } =
    useFetchPriceForEmptyPools();
  const poolIds = pricePoolId.map((item) => item.poolId);
  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useFetchLendOrder(poolIds);

  //  const { data: lendOrderData, loading: lendOrderLoading, error: lendOrderError } = useFetchLendOrder([1111111110]);

  const { price, loading: priceLoading, error: priceError } = usePriceOracle();
  const { userInfo, userDeposits, userBorrows, loadingUser, errorUser } =
    useFetchUserInfo(provider, walletAddress);

  let orderMergedData = mergeObjects(orderData, userDeposits);
  orderMergedData = mergeObjects(orderMergedData, userBorrows);
  orderMergedData = mergeObjects(orderMergedData, pricePoolId);
  //order the data based on buyPrice
  orderMergedData = orderMergedData.sort(
    (a, b) => Number(b.buyPrice) - Number(a.buyPrice)
  );

  return (
    <DataContext.Provider
      value={{
        pricePoolId,
        pricePoolIdLoading,
        pricePoolIdError,
        orderData,
        orderLoading,
        orderError,
        price,
        priceLoading,
        priceError,
        userInfo,
        userDeposits,
        userBorrows,
        loadingUser,
        errorUser,
        orderMergedData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
