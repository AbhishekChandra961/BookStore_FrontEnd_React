import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Header from "../HomePage/Header";
import { Link } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Header />
      <div style={{ width: "1000px", margin: "0 auto", marginTop: "50px" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>
                  Sign In and Sign Up: Create an account to access personalized
                  features.
                </li>
                <li>
                  OTP Verification: Secure your account with OTP verification.
                </li>
                <li>
                  Add to Cart: Browse and add books to your shopping cart.
                </li>
                <li>
                  Place Order: Complete your purchase by placing an order.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Technologies Used:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>Spring Boot: Backend framework used for creating APIs.</li>
                <li>
                  React.js: Frontend library used for building the user
                  interface.
                </li>
                <li>
                  Material-UI: UI component library for a sleek and modern
                  design.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Developer:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>Abhishek Chandra</li>
              </ul>
              <Typography variant="h5" gutterBottom>
                Links:
              </Typography>
              <ul>
                <li>
                  LinkedIn:{" "}
                  <Link
                    href="https://www.linkedin.com/in/abhishek-chandra-b615b51b7"
                    target="_blank"
                    rel="noopener"
                  >
                    Abhishek Chandra
                  </Link>
                </li>
                <li>
                  GitHub:{" "}
                  <Link
                    href="https://github.com/AbhishekChandra961"
                    target="_blank"
                    rel="noopener"
                  >
                    abhishekchandra2522
                  </Link>
                </li>
                <li>
                  Social Media:{" "}
                  <Link
                    href="https://twitter.com/achandra961"
                    target="_blank"
                    rel="noopener"
                  >
                    Twitter
                  </Link>{" "}
                  |{" "}
                  <Link
                    href="https://www.instagram.com/mr_chandra961/"
                    target="_blank"
                    rel="noopener"
                  >
                    Instagram
                  </Link>{" "}
                  {/* |{" "}
                  <Link href="#" target="_blank" rel="noopener">
                    Facebook
                  </Link> */}
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
