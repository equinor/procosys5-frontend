import { Button, Icon } from "@equinor/eds-core-react";
import { refresh } from "@equinor/eds-icons";

interface ActionProps {
  refreshFunction: () => Promise<void>;
}

export const PunchActions = ({ refreshFunction }: ActionProps) => {
  return (
    <>
      {" "}
      <Button variant="ghost_icon" onClick={refreshFunction}>
        <Icon data={refresh} title="Refresh" />
      </Button>
    </>
  );
};
