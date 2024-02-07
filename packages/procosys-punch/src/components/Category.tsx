import { Radio, Typography } from "@equinor/eds-core-react";
import { useState } from "react";
import styled from "styled-components";
import { PunchItem } from "../apitypes";
import { postByFetch } from "../services/CompletionApi";

const CategorySection = styled.div`
  display: flex;
  padding: 0;
  align-content: center;
`;

interface CategoryProps {
  punch: PunchItem;
}

export const Category = ({ punch }: CategoryProps) => {
  const [checked, updateChecked] = useState(punch?.category);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateChecked(event.target.value);
  };

  return (
    <>
      <CategorySection>
        <Typography variant="h5">Category *</Typography>
        <div
          style={{
            height: "100%",
            alignContent: "top",
            paddingTop: "0px",
            marginTop: "-10px",
          }}
        >
          <Radio
            style={{ padding: "0px" }}
            label="PA"
            value={"PA"}
            checked={checked === "PA"}
            onChange={onChange}
          />
          <Radio
            label="PB"
            value={"PB"}
            checked={checked === "PB"}
            onChange={onChange}
          />
        </div>
      </CategorySection>
    </>
  );
};
