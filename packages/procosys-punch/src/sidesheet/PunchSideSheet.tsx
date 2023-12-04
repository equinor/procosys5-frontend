import { Button, Tabs } from "@equinor/eds-core-react";
import { SideSheet } from "@equinor/fusion-react-side-sheet";

import { useState } from "react";

const PunchSideSheet = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <Button onClick={() => setOpenSheet(true)}>Open Side Sheet</Button>
      <SideSheet
        enableFullscreen
        minWidth={480}
        onClose={() => setOpenSheet(false)}
        isOpen={openSheet}
      >
        <SideSheet.Indicator />
        <SideSheet.Title title={"test"} />
        <SideSheet.SubTitle subTitle="test1" />
        <SideSheet.Actions>
          <Button
            onClick={function noRefCheck() {}}
            variant="ghost_icon"
          ></Button>
        </SideSheet.Actions>
        <SideSheet.Content>
          <Tabs
            onChange={(index) => setActiveTab(index)}
            activeTab={activeTab}
            variant="fullWidth"
          >
            <Tabs.List>
              <Tabs.Tab value={0}>Main</Tabs.Tab>
              <Tabs.Tab value={1}>History</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panels>
              <Tabs.Panel>Panel one</Tabs.Panel>
              <Tabs.Panel>Panel two</Tabs.Panel>
            </Tabs.Panels>
          </Tabs>
        </SideSheet.Content>
      </SideSheet>
    </div>
  );
};

export default PunchSideSheet;
