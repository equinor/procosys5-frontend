import ProcosysSideSheet from "@equinor/procosys5-sidesheet";
import { PunchActions } from "./PunchActions";
import { PunchDescription } from "./PunchDescription";
import { getByFetch } from "../services/CompletionApi";
import { CompletionApiSetting } from "../types";
import { useEffect, useState } from "react";
import { PunchItem } from "../apitypes";
import PunchFooter from "./PunchFooter";

type SheetProps = {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const DummyPunch = { punchid: "1234", type: "Punch item", category: "PB" };

export const PunchSideSheet = ({ openSheet, setOpenSheet }: SheetProps) => {
  return (
    <ProcosysSideSheet
      title={DummyPunch.punchid}
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
      subtitle={DummyPunch.type}
      actions={<></>}
      indicator
      indicatorColor={DummyPunch.category === "PB" ? "#ebbd34" : "#c43b3b"}
      tabs={[
        {
          TabTitle: "Main",
          TabContent: <></>,
        },
        {
          TabTitle: "Change history",
          TabContent: <></>,
        },
      ]}
    ></ProcosysSideSheet>
  );
};
