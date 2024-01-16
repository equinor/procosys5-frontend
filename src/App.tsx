import { useState } from "react";
import "./App.css";
import { PunchSideSheet } from "@equinor/procosys-punch";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Åpne sidesheet</button>
      <PunchSideSheet openSheet={open} setOpenSheet={setOpen} />
    </>
  );
}

export default App;
