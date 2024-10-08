// MenuBar.tsx
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import pairs from "../config/constants/pair.json";
import MENU_LINKS from "../config/constants/menu";
import { useTheme } from "../context/ThemeContext";
import { styled } from "@mui/material/styles";
import StyledRouterButton from "../components/buttons/StyledRouterButton";
import theme from "../theme";
import { formatNumber } from "../components/GlobalFunctions";
import { useDataContext } from "../context/DataContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuBar() {
  const { price, priceLoading, marketInfo } = useDataContext();
  const { darkMode } = useTheme();
  const [selectedPair, setSelectedPair] = useState(pairs[0]);
  const location = useLocation(); //useLocation to get current path
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  useEffect(() => {
    // find the link to the current path
    const currentMenu = MENU_LINKS.find(
      (menu) => menu.to === location.pathname
    );
    if (currentMenu) {
      setSelectedMenu(currentMenu.id);
    }
  }, [location.pathname]);

  const StyledButton = styled(StyledRouterButton)(({ theme }) => ({
    marginBottom: theme.spacing(1), // Equivalent to Tailwind's mb-4
    width: "90%", // Make the button take full width
    justifyContent: "flex-start", // Align text to the left
    padding: theme.spacing(0.5), // Equivalent to Tailwind's p-4
    borderRadius: theme.shape.borderRadius, // Default border radius
    textTransform: "none",
    border: "1px solid transparent",
    "&:hover": {
      //border: "1px solid transparent", // Ensure border remains transparent on hover
      backgroundColor: `${theme.palette.primary.main}`, // Example of hover background color change
      color: "black",
    },
    color: darkMode ? "white" : "black",
    "&.MuiButton-containedPrimary": {
      boxShadow: "none", // Remove box shadow on contained primary button
      "&:hover": {
        boxShadow: "none", // Remove box shadow on hover for contained primary button
      },
    },
  }));

  return (
    <div
      className={`w-72 fixed top-16 left-0 h-full z-10 shadow-md 
        ${darkMode ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <div className="flex flex-col pt-2">
        <nav className="flex flex-col items-center justify-center mt-5">
          {MENU_LINKS.map((menu) => (
            <StyledButton
              key={menu.id}
              to={menu.to}
              onClick={() => setSelectedMenu(menu.id)}
              sx={{
                //borderRadius: menu.label === "Markets" ? 5 : undefined,
                display: "flex",
                //justifyContent: menu.label === "Markets" ? "center" : undefined,

                backgroundColor:
                  selectedMenu === menu.id
                    ? menu.label === "Markets"
                      ? `${theme.palette.primary.main}`
                      : `${theme.palette.primary.main}`
                    : menu.label === "Markets"
                    ? undefined //`${theme.palette.background.default}`
                    : undefined,
                //fontWeight: selectedMenu === menu.id ? "bold" : "normal",
                color:
                  selectedMenu === menu.id //&& menu.label === "Markets"
                    ? `${theme.palette.common.black}`
                    : undefined,
                border:
                  menu.label === "Markets"
                    ? `0px solid ${theme.palette.text.primary}`
                    : "1px solid transparent",
                "&:hover": {
                  backgroundColor:
                    menu.label === "Markets"
                      ? `${theme.palette.primary.main}`
                      : undefined, // Example of hover background color change
                  //color: menu.label === "Markets" ? "white" : undefined,
                },
              }}
            >
              {menu.icon && (
                <span style={{ marginRight: "8px" }}>{menu.icon}</span>
              )}

              {menu.label === "Markets" ? (
                <div className="flex flex-col justify-start">
                  <br />
                  <div
                    className="flex mt-1"
                    style={{
                      fontSize: "120%",
                      fontWeight: 700,
                    }}
                  >
                    {selectedPair ? (
                      <>
                        <img
                          src={selectedPair.logourlA}
                          alt={selectedPair.tokenA}
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "4px",
                            marginTop: "3px",
                          }}
                        />
                        {marketInfo.baseTokenSymbol} /
                        <img
                          src={selectedPair.logourlB}
                          alt={selectedPair.tokenB}
                          style={{
                            height: "20px",
                            width: "20px",
                            marginLeft: "4px",
                            marginRight: "4px",
                            marginTop: "3px",
                          }}
                        />
                        {marketInfo.quoteTokenSymbol}
                        {"  "}
                        <span
                          className="flex "
                          style={{
                            verticalAlign: "middle",
                            marginTop: "-4px",
                            marginLeft: "4px",
                          }}
                        >
                          <ExpandMoreIcon sx={{ fontSize: "200%" }} />
                        </span>
                      </>
                    ) : (
                      "Select Pair"
                    )}
                  </div>
                  <div className="flex items-center flex-grow justify-start">
                    <span className={` text-[0.7rem] text-dark `}>
                      Price: 1 {marketInfo.baseTokenSymbol} ={" "}
                      {priceLoading
                        ? "Loading..."
                        : price
                        ? formatNumber(price)
                        : "0"}{" "}
                      {marketInfo.quoteTokenSymbol}
                    </span>
                  </div>
                </div>
              ) : (
                menu.label
              )}
            </StyledButton>
          ))}
        </nav>
      </div>
    </div>
  );
}
