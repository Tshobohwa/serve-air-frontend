import React from "react";
import Sidebar from "../components/Sidebar";
import { LuWarehouse } from "react-icons/lu";

const Warehouse = () => {
  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Warehouse</h1>
      </header>
    </Sidebar>
  );
};

export default Warehouse;
