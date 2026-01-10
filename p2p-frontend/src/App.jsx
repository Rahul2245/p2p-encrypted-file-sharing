import './App.css';
import {BrowserRouter as BR , Routes,Route} from "react-router-dom"

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ShareLink from "./pages/ShareLink";
import Receive from "./pages/Receive";
import Upload from "./pages/Upload";
import Complete from "./pages/Complete";
import Error from "./pages/Error";

function App() {
  return (
    <BR>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home/>}/>     
          <Route path="/sharelink" element={<ShareLink/>}/>
          <Route path="/receive" element={<Receive/>}/> 
          <Route path="/upload" element={<Upload/>}/> 
          <Route path="/complete" element={<Complete/>}/> 
          <Route path="/error" element={<Error/>}/>
        </Route> 
          </Routes>
    </BR>
  );
}

export default App;
