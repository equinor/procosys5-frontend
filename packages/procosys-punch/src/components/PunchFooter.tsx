import { Footer, Status } from "@equinor/procosys5-sidesheet";
import { PunchItem } from "../apitypes";
import { Button } from "@equinor/eds-core-react";
import { postByFetch } from "../services/CompletionApi";
import styled from "styled-components";

interface FooterProps {
  punch: PunchItem;
}

const PunchFooter = ({ punch }: FooterProps) => {
  const clearPunch = () => {
    postByFetch(`punchitems/${punch.guid}/clear`, {
      rowVersion: punch.rowVersion,
    });
  };

  return (
    <Footer>
      <div style={{ paddingRight: "24px", display: "flex" }}>
        <SectionWrapper>
          <Status
            status="Created"
            date={new Date(punch.createdAtUtc)}
            user={punch.createdBy.firstName + " " + punch.createdBy.lastName}
          />
          {punch.clearedBy && (
            <Status
              status="Cleared"
              date={new Date(punch.clearedAtUtc)}
              user={`${punch.clearedBy.firstName} ${punch.clearedBy.lastName}`}
            />
          )}
        </SectionWrapper>
        {punch.isReadyToBeCleared ? (
          <ButtonWrapper>
            <Button variant="contained" onClick={clearPunch}>
              Clear
            </Button>
          </ButtonWrapper>
        ) : punch.isReadyToBeVerified ? (
          <ButtonWrapper>
            <Button variant="ghost">Unclear</Button>
            <Button variant="ghost">Reject</Button>
            <Button variant="contained" onClick={clearPunch}>
              Verify
            </Button>
          </ButtonWrapper>
        ) : (
          <Button variant="contained" onClick={clearPunch}>
            {punch.isReadyToBeVerified && "Verify"}
          </Button>
        )}
      </div>
    </Footer>
  );
};

export default PunchFooter;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: end;
`;

const SectionWrapper = styled.div`
  flex: display;
  flex-direction: column;
`;
