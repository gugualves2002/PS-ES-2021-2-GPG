import React, { useState, useEffect, Component } from "react";
import { Card, Button } from "react-bootstrap";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useHistory } from "react-router-dom";
import Select from "react-select";

function Task() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [workers, setWorkers] = useState("");
  const [options, setOptions] = useState();
  const taskCollectionRef = collection(db, "tasks");
  const usersCollectionRef = collection(db, "users");
  const history = useHistory();

  useEffect(() => {
    const getUsers = async () => {
      const users = await getDocs(usersCollectionRef);
      const buildOptions = users.docs.map((userData) => {
        const user = userData.data();

        return { label: user.userName, value: user.author.id };
      });
      setOptions(buildOptions);
    };
    getUsers();
  }, []);

  const createTask = async () => {
    await addDoc(taskCollectionRef, {
      title,
      text,
      workers,
      author: {
        name: auth.currentUser.email,
        id: auth.currentUser.uid,
      },
    });
    history.push("/");
  };

  return (
    <>
      <h1 className="text-center mb-3">Crie uma nova task</h1>
      <Card>
        <Card.Body>
          <Card.Title>
            <input
              className="w-100 mb-3"
              placeholder="Nome da task:"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
          </Card.Title>
          <Card.Text>
            <input
              className=" w-100"
              placeholder="Descrição da task:"
              onChange={(event) => {
                setText(event.target.value);
              }}
            ></input>
          </Card.Text>
          <Select
            defaultValue={workers}
            options={options}
            onChange={(newValue) => {
              setWorkers(newValue.value);
            }}
          />
        </Card.Body>
        <Button className="w-100 mt-4" onClick={createTask}>
          Criar
        </Button>
      </Card>
      <div className="mb-4"></div>
    </>
  );
}
export default Task;
