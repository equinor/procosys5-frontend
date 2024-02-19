import { Footer, Status } from "@equinor/procosys5-sidesheet";
import { PunchItem } from "../apitypes";
import { Button } from "@equinor/eds-core-react";
import { postByFetch } from "../services/CompletionApi";
import styled from "styled-components";

interface FooterProps {
  punch: PunchItem;
}

const PunchFooter = () => {
  return (
    <Footer>
      <div style={{ paddingRight: "24px", display: "flex" }}></div>
    </Footer>
  );
};

export default PunchFooter;
