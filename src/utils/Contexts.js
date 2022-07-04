import React from "react";

const Contexts = React.createContext({
  active: { currentActivity: {}, setCurrentAvtivity: () => {} },
});

export default Contexts;
