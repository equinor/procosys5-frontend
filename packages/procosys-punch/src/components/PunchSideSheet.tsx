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
  punchId: string;
  plant: string;
};

const DummyPunch = { punchid: "1234", type: "Punch item", category: "PB" };

export const PunchSideSheet = ({
  openSheet,
  setOpenSheet,
  punchId,
  plant,
}: SheetProps) => {
  const [punch, setPunch] = useState<PunchItem>();

  const getPunch = async () => {
    if (punchId) {
      const data = await getByFetch(
        `punchitems/01000000-6966-6A1C-DD89-08DC27B34284`,
        plant
      );
      setPunch(data);
    }
  };

  useEffect(() => {
    getPunch();
  }, []);
  return (
    <ProcosysSideSheet
      title={punch?.guid}
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
      subtitle={"Punchitem"}
      actions={<></>}
      indicator
      indicatorColor={punch?.category === "PB" ? "#ebbd34" : "#c43b3b"}
      footer={<PunchFooter />}
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
