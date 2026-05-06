import CategoryStrip from "../. CategoryStrip";
import Banner from "../Banner";
import Deals from "../Deals";
import Hero from "../Hero";
import Itemspart from "./Itemspart";
import Products from "./Products";


const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">

      <Hero />
      <CategoryStrip />
      <Deals />
      <Products />     {/* your existing */}
      <Itemspart />    {/* your existing */}
      <Banner />

    </div>
  );
};

export default Home;