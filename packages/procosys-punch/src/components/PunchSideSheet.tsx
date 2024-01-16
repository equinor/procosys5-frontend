import { HEXString } from "@equinor/fusion-react-side-sheet";
import { ProcosysSideSheet } from "@equinor/procosys5-sidesheet";

type SheetProps = {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtitle: string;
  actions: JSX.Element;
  children: React.ReactNode;
  indicator?: false;
  indicatorColor?: HEXString;
};

export const PunchSideSheet = ({ openSheet, setOpenSheet }: SheetProps) => {
  return (
    <div>
      <ProcosysSideSheet
        title="123"
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        subtitle={""}
        actions={<></>}
      >
        <div>test</div>
      </ProcosysSideSheet>
    </div>
  );
};
