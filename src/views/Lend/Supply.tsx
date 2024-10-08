import { useEffect, useState } from "react";
import AmountCustom from "../../components/AmountCustom";
import CustomButton from "../../components/CustomButton";
import { useDataContext } from "../../context/DataContext";
import { Button } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import theme from "../../theme";
import { useDeposit } from "../../hooks/useDeposit";
import { useApproveQuoteToken } from "../../hooks/useApproveQuoteToken";
import AnalyticsButtons from "../../components/AnalyticsButtons";
import { userInfo } from "os";

import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import CropDinRoundedIcon from "@mui/icons-material/CropDinRounded";
import { getMetricsDataLending } from "../../components/AnalyticsButtonsMetricLegend";

const Supply = () => {
  const [supplyAmountQuantity, setSupplyAmountQuantity] = useState<number>(0);
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [poolId, setPoolId] = useState<string>("");
  const [buttonClickable, setButtonClickable] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);

  const [textAfterClick, setTextAfterClick] = useState<string>("");
  const [textNotClickable, setTextNotClickable] = useState<string>(
    "Must enter an amount to supply (above 200 lbUSDC)"
  );

  const {
    userInfo,
    poolLoading,
    orderMergedData,
    orderMergedDataUnderMarketPrice,
    poolData,
    refetchData,
    marketInfo,
  } = useDataContext();

  const customDataColumnsConfig = [
    {
      key: "buyPrice",
      title: "Buy Price",
      metric: marketInfo.quoteTokenSymbol,
    },
    {
      key: "deposits",
      title: "Total Supply",
      metric: marketInfo.quoteTokenSymbol,
    },
    { key: "lendingRate", title: "Net APY", metric: "%" },
    { key: "utilizationRate", title: "Utilization", metric: "%" },
    {
      key: "mySupply",
      title: "My Supply",
      metric: marketInfo.quoteTokenSymbol,
    },
  ];

  const [metricsData, setMetricsData] = useState(
    getMetricsDataLending(marketInfo)
  );

  const displayedData = showAll
    ? orderMergedDataUnderMarketPrice
    : orderMergedDataUnderMarketPrice.slice(0, 5);
  //const displayedData = showAll ? poolData : poolData.slice(0, 3);

  let sortedData = [...displayedData];
  sortedData.sort((a, b) => Number(a.buyPrice) - Number(b.buyPrice));

  // sortedData.forEach((item) => {
  //   console.log("item.mySupplyCumulated", item.mySupplyCumulated);
  // });

  const updateButtonClickable = (quantity: number, price: string) => {
    const isClickable = quantity > 200 && price !== "";
    setButtonClickable(isClickable);
    setTextAfterClick("");
    if (quantity <= 200) {
      setTextNotClickable("Must enter an amount to supply (above 200 lbUSDC)");
    } else if (price == "") {
      setTextNotClickable("Must select a buy price");
    }
  };

  const handleQuantityChange = (newQuantity: any) => {
    setSupplyAmountQuantity(newQuantity);
    updateButtonClickable(newQuantity, buyPrice);
  };

  const handleRowClick = (rowData: any) => {
    console.log("handleRowClick clicked!");
    const newBuyPrice = rowData.buyPrice;
    setBuyPrice(newBuyPrice);
    const newPoolId = rowData.poolId;
    setPoolId(newPoolId);
    updateButtonClickable(supplyAmountQuantity, newBuyPrice);
  };

  const approveQuoteToken = useApproveQuoteToken();
  const deposit = useDeposit();

  const handleButtonClick = async () => {
    //setMessage("Button clicked!");
    if (buttonClickable) {
      setTextAfterClick("Transaction approval sent ...");
      const resultApproval = await approveQuoteToken(
        String(supplyAmountQuantity)
      );
      setTextAfterClick(resultApproval);

      setTextAfterClick("Transaction deposit sent ...");
      const result = await deposit(
        Number(poolId),
        String(supplyAmountQuantity),
        Number(poolId) + 1
      );
      setTextAfterClick(result);
      if (result == "Transaction successful!") {
        refetchData();
        // FIXEME j'appelle une deuxieme fois car ya un prblm et on ne recupere pas le nvx poolData
        // à cause de la mise a jour asynchrone il me semble et car ya pas de synchronisation entre poolData
        // et les user data (userDeposits et userBorrows)
        refetchData();
      }
    }
  };

  useEffect(() => {
    // Cette fonction sera appelée chaque fois que poolData change
    console.log("poolData a changé :", poolData);
    // Ici vous pouvez effectuer toute action nécessaire après la mise à jour de poolData
  }, [poolData]); // Mettez à jour lorsque poolData change

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      {/* <div className="flex justify-center mt-0 mb-15"> */}
      <span>
        Your supply can be deposited in a maximum of six different pools.
      </span>
      <div className="flex mt-2 mb-15">
        <AnalyticsButtons
          title="Select a pool to supply"
          columnsConfig={customDataColumnsConfig}
          data={sortedData}
          metrics={metricsData}
          isLoading={poolLoading}
          onRowClick={handleRowClick}
          userMetricBorder={"mySupplyCumulated"}
          userMetricBorderColor={theme.palette.primary.main}
        />
      </div>
      {/* <div className="flex justify-center mt-5"> */}
      <div className="flex mt-5">
        <AmountCustom
          title="Amount to supply"
          tokenWalletBalance={userInfo.quoteTokenBalance}
          selectedToken={marketInfo.quoteTokenSymbol}
          ratioToUSD={1}
          onQuantityChange={handleQuantityChange}
        />
      </div>
      {/* <div className="flex mt-5">
        <CustomTable
          title="Select a buy price associated with your lending position"
          columnsConfig={customDataColumnsConfig}
          data={displayedData}
          clickableRows={true}
          onRowClick={handleRowClick}
          isLoading={poolLoading}
        />
      </div>
      <Button
        onClick={toggleShowAll}
        style={{
          float: "right", // Aligner à droite
          textTransform: "none",
          color: theme.palette.text.primary,
        }}
      >
        {showAll ? "show less" : "show more"}
      </Button> */}
      {/* <div className="flex justify-center  mt-10"> */}
      <div className="flex mt-10">
        <CustomButton
          clickable={buttonClickable}
          handleClick={handleButtonClick}
          textAfterClick={textAfterClick}
          textClickable="Supply"
          textNotClickable={textNotClickable}
          buttonWidth={300}
          borderRadius={50}
        />
      </div>
    </div>
  );
};

export default Supply;
