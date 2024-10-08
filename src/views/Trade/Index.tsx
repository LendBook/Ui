import { Box, Card, Paper, Typography } from "@mui/material";
import { useState } from "react";
import TabsCustom from "../../components/TabsCustom";
import theme from "../../theme";
import MetricCustom from "../../components/MetricCustom";
import { useDataContext } from "../../context/DataContext";
import TabsCustomV2 from "../../components/TabsCustomV2";
import BaseToQuote from "./BaseToQuote";
import QuoteToBase from "./QuoteToBase";
import DivWithTooltip from "../../components/DivWithTooltip";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<string>("");

  const handleToggleClick = (label: string) => {
    setSelectedTab(label);
  };

  const { marketInfo } = useDataContext();

  return (
    <div className="mt-20 ml-72 mr-4 mb-20">
      <Card
        sx={{
          maxWidth: "1100px",
          margin: "auto",
          background: "transparent",
          boxShadow: "none",
          border: "none",
        }}
      >
        <Box>
          <div>
            <Typography variant="h3" color="black">
              Trade
            </Typography>
            <div className="flex mb-5">
              <span>
                Takers can swap an asset for another asset if the market price
                reaches the limit price of a pool-of-orders. Takers can take all
                the non-borrowable liquidity in a pool. Takers are like
                liquidators in other lending protocols. They are important
                because they close borrowing positions.
                <i>
                  <b>
                    <br></br>Once LendBook is mainnet, this page will be
                    irrelevant. Indeed, these trades will be made by bots and
                    through DEX aggregators.
                  </b>
                </i>
              </span>
            </div>
            <div className="flex mt-5"></div>
            <Paper
              elevation={0} //4
              sx={{
                borderRadius: 1,
                padding: 1,
                display: "inline-block",
                width: "100%",
                border: `1px solid ${theme.palette.error.main}`, //
                //backgroundColor: theme.palette.background.default,
              }}
              className="flex flex-col"
            >
              <TabsCustomV2
                labels={[
                  `${marketInfo.baseTokenSymbol} to ${marketInfo.quoteTokenSymbol}`,
                  `${marketInfo.quoteTokenSymbol} to ${marketInfo.baseTokenSymbol}`,
                ]}
                onClick={handleToggleClick}
              />
              <div className="flex mt-5"></div>
              {selectedTab ===
                `${marketInfo.baseTokenSymbol} to ${marketInfo.quoteTokenSymbol}` && (
                <BaseToQuote />
              )}
              {selectedTab ===
                `${marketInfo.quoteTokenSymbol} to ${marketInfo.baseTokenSymbol}` && (
                <QuoteToBase />
              )}
              <div className="flex mt-2"></div>
            </Paper>
          </div>
        </Box>
      </Card>
    </div>
  );
};

export default Index;
