//import JarPage from "../features/Jar/JarPage.tsx";
import SideBar from "../shared/SideBar.tsx";
import ReviewsPage from "../features/reviews/ReviewsPage.tsx";


function App() {
  return(
      <>
        <SideBar />
          <main className="relative h-screen ml-[200px] pt-10">
              <ReviewsPage />
          </main>
      </>
  )
}

export default App
