import { Box, Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import theme from "../theme";
import { formatNumber, formatNumberPriceFig } from "./GlobalFunctions";

type AnalyticButtonProps = {
  clickable: boolean;
  clicked: boolean;
  handleClick: () => void;
  borderRadius?: number;
  buttonHeight?: number;
  buttonWidth?: number;
  boxLendHeightRatio?: number;
  boxBorrowHeightRatio?: number;
  userBoxHeight: number;
  userBoxColor: string;
  price: number;
  lendAPY: number;
  borrowAPY: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function AnalyticButton({
  clickable,
  clicked,
  handleClick,
  borderRadius,
  buttonHeight,
  buttonWidth,
  boxLendHeightRatio,
  boxBorrowHeightRatio,
  userBoxHeight,
  userBoxColor,
  price,
  lendAPY,
  borrowAPY,
  onMouseEnter,
  onMouseLeave,
}: AnalyticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnterLocal = () => {
    setIsHovered(true);
    onMouseEnter(); // Appel de la fonction de rappel
  };

  const handleMouseLeaveLocal = () => {
    setIsHovered(false);
    onMouseLeave(); // Appel de la fonction de rappel
  };

  return (
    <div className="flex-shrink-0 ">
      <Button
        style={{
          //textTransform: "none",
          height: "250px",
          width: typeof buttonWidth === "number" ? `${buttonWidth}px` : "auto",
          borderRadius:
            typeof borderRadius === "number" ? `${borderRadius}px` : "5px",
          backgroundColor: isHovered ? theme.palette.error.main : "inherit",
          display: "flex", // Aligner les Box en ligne
          justifyContent: "center", // Centrer horizontalement
          alignItems: "flex-end", // center
          position: "relative",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          padding: 0, // Supprime le padding
          margin: 0, // Supprime les marges
        }}
        onClick={handleClick}
        disabled={!clickable}
        onMouseEnter={handleMouseEnterLocal}
        onMouseLeave={handleMouseLeaveLocal}
      >
        <Button
          style={{
            //textTransform: "none",
            //padding: "5px", `${buttonHeight}px`
            height: buttonHeight != 0 ? `${buttonHeight}px` : "15px",
            width:
              typeof buttonWidth === "number" ? `${buttonWidth}px` : "auto",
            borderRadius:
              typeof borderRadius === "number" ? `${borderRadius}px` : "5px",
            backgroundColor: isHovered
              ? theme.palette.secondary.main
              : clicked
              ? theme.palette.secondary.main
              : theme.palette.error.main,
            border:
              userBoxHeight != 0
                ? `${userBoxHeight}px solid ${userBoxColor}`
                : `0px solid ${theme.palette.error.main}`,
            display: "flex", // Aligner les Box en ligne
            justifyContent: "center", // Centrer horizontalement
            alignItems: "flex-end", // center
            position: "relative",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
          disabled={true}
        >
          <Box
            sx={{
              width: "55%",
              height:
                typeof boxLendHeightRatio === "number"
                  ? `${boxLendHeightRatio}`
                  : "0px",
              borderRadius: 0.6,
              marginRight: 0.8,
              bgcolor: isHovered
                ? theme.palette.primary.main
                : theme.palette.primary.main,
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
          />
          <Box
            sx={{
              width: "55%",
              height:
                typeof boxBorrowHeightRatio === "number"
                  ? `${boxBorrowHeightRatio}`
                  : "0px",
              borderRadius: 0.5,
              bgcolor: isHovered
                ? theme.palette.success.main
                : theme.palette.success.main,
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
          />
          {/* <Box
            sx={{
              position: "absolute",
              top: "calc(100% + 4px)", // Ajoute une marge de 4px en dessous de l'élément principal
              width: "100%",
              height:
                typeof userBoxHeight === "number"
                  ? `${userBoxHeight}px`
                  : "0px",
              borderRadius: 0.5,
              bgcolor: isHovered ? userBoxColor : userBoxColor,
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
          > */}

          {/* </Box> */}

          {/*Box pour mettre la valeur de lendAPY au dessus de la pool*/}
          {/* {lendAPY != 0 ? (
            <Box
              sx={{
                position: "absolute",
                top: "-24px", // Positionne le texte en dessous de l'élément principal
                //left: "50%", // Positionne le début du texte au milieu horizontalement
                color: theme.palette.secondary.main,
                transition: "color 0.3s ease, transform 0.3s ease",
                fontWeight: isHovered ? "bold" : clicked ? "bold" : "inherit",
                fontSize: "90%",
              }}
            >
              {formatNumber(lendAPY)}%
            </Box>
          ) : (
            ""
          )} */}
        </Button>
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 2px)", // Positionne le texte en dessous de l'élément principal
            //left: "50%", // Positionne le début du texte au milieu horizontalement
            //transform: "rotate(45deg) ", // Incline le texte et ajuste la position de son point de départ
            //transformOrigin: "0 0", // Point d'origine de la rotation
            whiteSpace: "nowrap", // Empêche le texte de se briser sur plusieurs lignes
            color: theme.palette.secondary.main,
            fontWeight: isHovered ? "bold" : clicked ? "bold" : "inherit",
            fontSize: isHovered ? "110%" : clicked ? "110%" : "inherit",
            transition: "font-weight 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* <Box
            sx={{
              position: "absolute",
              top: "calc(100% + 2px)", // Positionne le texte en dessous de l'élément principal
              left: "50%", // Positionne le début du texte au milieu horizontalement
              transform: "rotate(45deg) ", // Incline le texte et ajuste la position de son point de départ
              transformOrigin: "0 0", // Point d'origine de la rotation
              whiteSpace: "nowrap", // Empêche le texte de se briser sur plusieurs lignes
              color: theme.palette.secondary.main,
              fontWeight: isHovered ? "bold" : clicked ? "bold" : "inherite",
              fontSize: isHovered ? "110%" : clicked ? "110%" : "inherite",
              transition: "font-weight 0.3s ease, transform 0.3s ease",
            }}
          > */}
          {formatNumberPriceFig(price)}
        </Box>
      </Button>
    </div>
  );
}
