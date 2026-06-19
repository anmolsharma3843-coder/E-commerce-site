import Header from "./components/Header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/Scroll";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;