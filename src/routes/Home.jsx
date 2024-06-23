import Navbar from "../components/Navbar";

function Home (){
    return(
        <>
              <Navbar />
            <div className ="tour">
                <marquee behavior="alternate" direction="right"> LET'S TOUR FOUNTAIN UNIVERSITY TOGETHER</marquee>
               
            </div>
        </>
    );
}
export default Home;