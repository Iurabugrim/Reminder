import { useState } from "react";
import List from "../List";

interface Props {}

const Home = (props: Props) => {
  const [isBirthday, setIsBirthday] = useState(true);

  return (
    <>
      {isBirthday ? (
        <>
          <h3>0 Birthdays today </h3>
          <List />
          <div className="buttons">
            <button onClick={() => console.log("click")}>Clear</button>
            <button onClick={() => setIsBirthday(false)}>Add People</button>
          </div>
        </>
      ) : (
        <>
          <div className="close" onClick={() => setIsBirthday(true)}>
            <img src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" alt="Close Button" />
          </div>
          <h3>All People </h3>
          <List />
          <div className="buttons">
            <button onClick={() => console.log("click")}>Add</button>
            <button onClick={() => setIsBirthday(true)}>Delete</button>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
