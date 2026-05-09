import Header from "./components/Header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/Scroll";
import { Suspense } from "react";

function App() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <main className="min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Loading...
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