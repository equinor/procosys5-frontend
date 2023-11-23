import { Button } from "@equinor/eds-core-react";
import { SideSheet } from "@equinor/fusion-react-side-sheet";

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
        <SideSheet.Title title={"test"} />
        <SideSheet.SubTitle subTitle="test1" />
        <SideSheet.Actions>
          <Button
            onClick={function noRefCheck() {}}
            variant="ghost_icon"
          ></Button>
        </SideSheet.Actions>
        <SideSheet.Content />
      </SideSheet>
    </div>
  );
}
