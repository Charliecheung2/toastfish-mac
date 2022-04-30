import { Choice, Home, Notice, Remember } from "./page";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  /*useEffect(() => {
    const selectDb = new window.database.Select("CET4_1", 20);

    //获取当前词书和单词数目
    selectDb.getBookNameAndNumber();
    console.log(selectDb.TABLE_NAME);
    console.log(selectDb.WORD_NUMBER);

    //背完一个单词后，加1
    selectDb.updateCount();

    //更改默认词书？
    selectDb.updateBookName("cet-4");
    selectDb.updateNumber("30");

    //查询进度
    console.log("2", selectDb.selectCount());

    //更改词书
    selectDb.selectWordList("CET6_1");

    //随机获取n个单词
    console.log(selectDb.getRandomWordList(3));

    //随机获取n个单词
    console.log(selectDb.getRandomWords(2));
  });*/

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/choice" element={<Choice />}></Route>
        <Route path="/notice" element={<Notice />}></Route>
        <Route path="/remember" element={<Remember />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
