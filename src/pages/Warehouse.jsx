import React from "react";
import Sidebar from "../components/Sidebar";
import { LuWarehouse } from "react-icons/lu";
import PackageCard from "../cards/PackageCard";

const Warehouse = () => {
  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Warehouse</h1>
      </header>
      <section className="w-full grid grid-cols-2 gap-4 my-4">
        <PackageCard />
        <PackageCard />
        <PackageCard />
        <PackageCard />
      </section>
    </Sidebar>
  );
};

export default Warehouse;
