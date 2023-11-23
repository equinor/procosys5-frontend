import { Button } from "@equinor/eds-core-react";
import { SideSheet } from "@equinor/fusion-react-side-sheet";
import Actions from "@equinor/fusion-react-side-sheet/dist/components/Actions";
import { Title } from "@equinor/fusion-react-side-sheet/dist/components/Title";
import { SubTitle } from "@equinor/fusion-react-side-sheet/dist/components/SubTitle";
import { Content } from "@equinor/fusion-react-side-sheet/dist/components/Content";

import { useState } from "react";

export default function PunchSideSheet() {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpenSheet(true)}>Open Side Sheet</Button>
      <SideSheet
        enableFullscreen
        minWidth={480}
        onClose={() => setOpenSheet(false)}
        isOpen={openSheet}
      >
        <Title title={"test"} />
        <SubTitle subTitle="test1" />
        <Actions>
          <Button
            onClick={function noRefCheck() {}}
            variant="ghost_icon"
          ></Button>
        </Actions>
        <Content />
      </SideSheet>
    </div>
  );
}
