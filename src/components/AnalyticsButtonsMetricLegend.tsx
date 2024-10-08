// metricsData.tsx
import React from "react";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import CropDinRoundedIcon from "@mui/icons-material/CropDinRounded";
import theme from "../theme";

interface MarketInfo {
  quoteTokenSymbol: string;
  baseTokenSymbol: string;
}

export const getMetricsDataLending = (marketInfo: MarketInfo) => [
  {
    key: "buyPrice",
    title: "Buy Price",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    color: theme.palette.info.main,
    tooltipText: "The buy price linked to the selected pool of orders",
  },
  {
    key: "deposits",
    title: "Supply",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    color: theme.palette.primary.main,
    icon: <SquareRoundedIcon fontSize="small" />,
    tooltipText:
      "Sum of the lending supply in the selected pool (represented by a green bar in each pool with supply)",
  },
  {
    key: "borrows",
    title: "Borrow",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    color: theme.palette.success.main,
    icon: <SquareRoundedIcon fontSize="small" />,
    tooltipText:
      "Sum of the borrowing positions in the selected pool (represented by a purple bar in each pool with loans)",
  },
  {
    key: "mySupply",
    title: "My supply",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    color: theme.palette.primary.main,
    icon: <CropDinRoundedIcon fontSize="small" />,
    tooltipText:
      "Your lending supply in the selected pool (represented by a colored frame for each pool having your supply)",
  },
  {
    key: "lendingRate",
    title: "Net APY",
    value: "-",
    unit: "%",
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    color: theme.palette.info.main,
    tooltipText: "The APY linked to the selected pool",
  },
  {
    key: "utilizationRate",
    title: "Utilization",
    value: "-",
    unit: "%",
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    color: theme.palette.info.main,
    tooltipText: "The utilization rate of the selected pool",
  },
];

export const getMetricsDataLendingWithdraw = (marketInfo: MarketInfo) => [
  {
    key: "buyPrice",
    title: "Buy Price",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.info.main,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    tooltipText: "The buy price linked to the selected pool of orders",
  },
  // {
  //   key: "deposits",
  //   title: "Supply",
  //   value: "-",
  //   unit: marketInfo.quoteTokenSymbol,
  //   color: theme.palette.primary.main,
  //   icon: <SquareRoundedIcon fontSize="small" />,
  //   tooltipText: "Sum of the lending supply in the selected pool",
  // },
  // {
  //   key: "borrows",
  //   title: "Borrow",
  //   value: "-",
  //   unit: marketInfo.quoteTokenSymbol,
  //   color: theme.palette.success.main,
  //   icon: <SquareRoundedIcon fontSize="small" />,
  //   tooltipText: "Sum of the borrowing positions in the selected pool",
  // },
  {
    key: "mySupply",
    title: `My supply`,
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.primary.main,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    icon: <CropDinRoundedIcon fontSize="small" />,
    tooltipText:
      "Your lending supply in the selected pool (represented by a colored frame for each pool having your supply)",
  },
  // {
  //   key: "mySupplyInETH",
  //   title: `My supply (${marketInfo.baseTokenSymbol})`,
  //   value: "-",
  //   unit: marketInfo.quoteTokenSymbol,
  //   color: theme.palette.primary.main,
  //   icon: <CropDinRoundedIcon fontSize="small" />,
  //   tooltipText:
  //     "Your lending supply in the selected pool (shown as a colored border for each pool having your supply)",
  // },
  {
    key: "lendingRate",
    title: "Net APY",
    value: "-",
    unit: "%",
    color: theme.palette.info.main,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    tooltipText: "The APY linked to the selected pool",
  },
  {
    key: "utilizationRate",
    title: "Utilization",
    value: "-",
    unit: "%",
    color: theme.palette.info.main,
    fontSize: "100%",
    valueColor: theme.palette.common.black,
    tooltipText: "The utilization rate of the selected pool",
  },
];

export const getMetricsDataBorrowing = (marketInfo: MarketInfo) => [
  {
    key: "buyPrice",
    title: "Buy Price",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.info.main,
    tooltipText: "The buy price linked to the selected pool of orders",
  },
  {
    key: "deposits",
    title: "Supply",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.primary.main,
    icon: <SquareRoundedIcon fontSize="small" />,
    tooltipText:
      "Sum of the lending supply in the selected pool (represented by a green bar in each pool with supply)",
  },
  {
    key: "borrows",
    title: "Borrow",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.success.main,
    icon: <SquareRoundedIcon fontSize="small" />,
    tooltipText:
      "Sum of the borrowing positions in the selected pool (represented by a purple bar in each pool with loans)",
  },
  {
    key: "myBorrowingPositions",
    title: "My borrow",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.success.main,
    icon: <CropDinRoundedIcon fontSize="small" />,
    tooltipText:
      "Your borrowing position in the selected pool (represented by a colored frame for each pool having your loan)",
  },
  {
    key: "borrowingRate",
    title: "Borrow APY",
    value: "-",
    unit: "%",
    color: theme.palette.info.main,
    tooltipText: "The borrowing APY linked to the selected pool",
  },
  {
    key: "utilizationRate",
    title: "Utilization",
    value: "-",
    unit: "%",
    color: theme.palette.info.main,
    tooltipText: "The utilization rate of the selected pool",
  },
  {
    key: "maxLTV",
    title: "Max LTV",
    value: "-",
    unit: "%",
    color: theme.palette.info.main,
    tooltipText:
      "The maximum Loan-To-Value you can have if you borrow from the selected pool",
  },
];

export const getMetricsDataBorrowingRepay = (marketInfo: MarketInfo) => [
  {
    key: "buyPrice",
    title: "Buy Price",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.info.main,
    tooltipText: "The buy price linked to the selected pool of orders",
  },
  {
    key: "deposits",
    title: "Supply",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.primary.main,
    icon: <SquareRoundedIcon fontSize="small" />,
    tooltipText:
      "Sum of the lending supply in the selected pool (represented by a green bar in each pool with supply)",
  },
  {
    key: "borrows",
    title: "Borrow",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.success.main,
    icon: <SquareRoundedIcon fontSize="small" />,
    tooltipText:
      "Sum of the borrowing positions in the selected pool (represented by a purple bar in each pool with loans)",
  },
  {
    key: "myBorrowingPositions",
    title: "My borrow",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.success.main,
    icon: <CropDinRoundedIcon fontSize="small" />,
    tooltipText:
      "Your borrowing position in the selected pool (represented by a colored frame for each pool having your loan)",
  },
  {
    key: "borrowingRate",
    title: "Borrow APY",
    value: "-",
    unit: "%",
    color: theme.palette.info.main,
    tooltipText: "The borrowing APY linked to the selected pool",
  },
  {
    key: "utilizationRate",
    title: "Utilization",
    value: "-",
    unit: "%",
    color: theme.palette.info.main,
    tooltipText: "The utilization rate of the selected pool",
  },
];

export const getMetricsDataTradeBaseToQuote = (marketInfo: MarketInfo) => [
  {
    key: "buyPrice",
    title: "Buy Price",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.info.main,
    tooltipText: "The buy price of the pool",
  },
  {
    key: "availableSupply",
    title: "Available supply for trading",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.info.main,
    tooltipText: "",
  },
];

export const getMetricsDataTradeQuoteToBase = (marketInfo: MarketInfo) => [
  {
    key: "buyPrice",
    title: "Buy Price",
    value: "-",
    unit: marketInfo.quoteTokenSymbol,
    color: theme.palette.info.main,
    tooltipText: "The buy price of the pool",
  },
  {
    key: "pairedAvailableSupplyQuote",
    title: "Available supply for trading",
    value: "-",
    unit: marketInfo.baseTokenSymbol,
    color: theme.palette.info.main,
    tooltipText: "",
  },
];
