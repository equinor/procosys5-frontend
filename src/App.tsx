import { useState } from "react";
import "./App.css";
import { PunchSideSheet } from "@equinor/procosys-punch";
import { Button } from "@equinor/eds-core-react";

function App() {
  const [open, setOpen] = useState(false);
  const [punch, setPunch] = useState("01000000-6966-6A1C-DD89-08DC27B34283");

  const handleOpenFirst = () => {
    setOpen(true);
    setPunch("01000000-6966-6A1C-DD89-08DC27B34283");
  };

  const handleOpenSecond = () => {
    setOpen(true);
    setPunch("01000000-6966-6A1C-DD89-08DC27B34284");
  };

  return (
    <>
      <div style={{ display: "flex", gap: "5px" }}>
        <Button onClick={handleOpenFirst}>Åpne punch</Button>
      </div>

      <PunchSideSheet
        openSheet={open}
        setOpenSheet={setOpen}
        plant="OSEBERG_C"
        punchId={punch}
      />
    </>
  );
}

export default App;
