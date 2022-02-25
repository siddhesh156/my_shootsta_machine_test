import React, { useState } from "react";
import { Button, InputGroup, FormControl, Card } from "react-bootstrap";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [searchData, setSearchData] = useState([]);

  const onHandleSearch = () => {
    //Get data from API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then(
        (result) => {
          //Setting data from API to the state
          setSearchData(result[0].meanings[0].definitions);
        },
        (error) => {
          //Error from API
          console.log("Error from API ", error);
        }
      );
  };

  try {
    return (
      <React.Fragment>
        <div className="main-container">
          <h1>Dictionary</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={word}
              onChange={(event) => setWord(event.target.value)}
            />
          </InputGroup>

          <Button
            variant="dark"
            style={{ alignSelf: "center", width: "70%" }}
            onClick={() => onHandleSearch()}
          >
            Submit
          </Button>

          {searchData.length > 0 && (
            <div className="mt-5">
              <Card style={{ background: "#7c795d" }}>
                <Card.Body
                  style={{
                    color: "rgb(247, 154, 12)",
                    fontFamily: "Trocchi, serif",
                  }}
                >
                  <Card.Title style={{ textAlign: "center" }}>
                    Definitions
                  </Card.Title>
                  <ul>
                    {searchData.map((data, index) => {
                      let checkExample = data?.example !== undefined;
                      return (
                        <li key={index}>
                          {data.definition}
                          {checkExample
                            ? " For example " + data?.example
                            : null}
                        </li>
                      );
                    })}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
        <style>{`
      .main-container{
        margin: 5% 20%;
        display: flex;
        flex-direction: column;
      }

      h1{ 
        color: #7c795d; 
        font-family: 'Trocchi', serif; font-size: 45px; font-weight: normal; line-height: 48px; margin-bottom: 5%; 
      }
      
      @media screen and (max-width: 750px) {
        .main-container {
            margin: 5% 5%;
        }
      }
      `}</style>
      </React.Fragment>
    );
  } catch (error) {
    console.log("Dictionat Error ", error);
    return null;
  }
};
export default Dictionary;
