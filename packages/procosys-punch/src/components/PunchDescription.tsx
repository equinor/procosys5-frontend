import { Card, TextField } from "@equinor/eds-core-react";
import { ContentSection } from "@equinor/procosys5-sidesheet";
import { Category } from "./Category";
import styled from "styled-components";
import { MarkdownEditor } from "@equinor/fusion-react-markdown";
import { PunchItem } from "../apitypes";
import { patchByFetch, postByFetch } from "../services/CompletionApi";

const CardContent = styled.div`
  display: flex;
  gap: 24px;
`;

const OrganizationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface Props {
  punch: PunchItem;
}

export const PunchDescription = ({ punch }: Props) => {
  const onChange = (content: string) => {
    patchByFetch(`punchItems/${punch.guid}`, {
      rowVersion: punch.rowVersion,
      patchDocument: [
        {
          value: content,
          path: "/Description",
          op: "replace",
        },
      ],
    });
  };
  return (
    <>
      <ContentSection>
        <Card>
          <Card.Header>
            <Card.HeaderTitle>
              <Category punch={punch} />
            </Card.HeaderTitle>
          </Card.Header>{" "}
          <Card.Content>
            <CardContent>
              <TextField
                id="1"
                multiline
                label="Description"
                required
                style={{ width: "100%" }}
                rows={5}
                defaultValue={punch?.description}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => {
                  onChange(e.target.value);
                }}
              />

              <OrganizationWrapper>
                <TextField
                  id="2"
                  label="Raised by org"
                  defaultValue={punch.raisedByOrg.code}
                />
                <TextField
                  id="3"
                  label="Clearing by org"
                  defaultValue={punch.clearingByOrg.code}
                />
              </OrganizationWrapper>
            </CardContent>
          </Card.Content>
        </Card>
      </ContentSection>
    </>
  );
};
