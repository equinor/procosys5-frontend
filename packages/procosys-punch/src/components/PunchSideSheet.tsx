import ProcosysSideSheet, { Footer } from "@equinor/procosys5-sidesheet";
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
  punchId: string;
  plant: string;
};

const DummyPunch = { punchid: "1234", type: "Punch item" };

export const PunchSideSheet = ({
  openSheet,
  setOpenSheet,
  punchId,
  plant,
}: SheetProps) => {
  const [punch, setPunch] = useState<PunchItem>();

  const getPunch = async () => {
    if (punchId) {
      const data = await getByFetch(`punchitems/${punchId}`, plant);
      setPunch(data);
    }
  };

  useEffect(() => {
    getPunch();
  }, []);

  return (
    <ProcosysSideSheet
      title={punch?.itemNo}
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
      subtitle={DummyPunch.type}
      actions={<PunchActions refreshFunction={getPunch} />}
      indicator
      indicatorColor={punch?.category === "PB" ? "#ebbd34" : "#c43b3b"}
      footer={<PunchFooter punch={punch} />}
      tabs={[
        {
          TabTitle: "Main",
          TabContent: <PunchDescription punch={punch} />,
        },
        {
          TabTitle: "Change history",
          TabContent: <></>,
        },
      ]}
    ></ProcosysSideSheet>
  );
};
