import { useState } from "react";

import "./App.css";
import GameContainer from "./modules/GameContainer";
import React from "react";
import { MainScreen } from "./modules/MainScreen";

function App() {
  console.log(`#     # ### ######  #######    #     # ####### 
#     #  #  #     # #          ##   ## #       
#     #  #  #     # #          # # # # #       
#######  #  ######  #####      #  #  # #####   
#     #  #  #   #   #          #     # #       
#     #  #  #    #  #          #     # #       
#     # ### #     # #######    #     # #######`);
  console.log("Email: ejhessing@gmail.com");
  return <MainScreen />;
}

export default App;
