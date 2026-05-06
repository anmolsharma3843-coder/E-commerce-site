import React, { Suspense } from "react";
import CategoryStrip from "../CategoryStrip";
import Banner from "../Banner";
import Deals from "../Deals";
import Hero from "../Hero";
const Itemspart = React.lazy(() => import("./Itemspart"))
const Products = React.lazy(() => import("./Products"));
const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">

      <Hero />
      <CategoryStrip />
      <Deals />
     <Suspense fallback={<div>Loading...</div>}>
  <Products />
  <Itemspart />
</Suspense> {/* your existing */}
      <Banner />

    </div>
  );
};

export default Home;