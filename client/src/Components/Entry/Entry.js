import style from './Entry.module.css'
import Home from "./Components/Home";
import Functions from './Components/Functions';
import Footer from './Components/Footer';

function Entry() {
  return (
    <div className={style.App}>
      <Home/>
      <Functions/>
      <Footer/>
    </div>
  );
}

export default Entry;
