import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Card, Button } from "react-bootstrap";
import { db } from "../firebase";

function Home() {
  const [taskLists, setTaskLists] = useState([]);
  const [workerList, setWorkerList] = useState([])
  const taskCollectionRef = collection(db, "tasks");
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getTasks = async () => {
      const id = await localStorage.getItem("uid");
      const userData = await getDocs(
        query(userCollectionRef, where("author.id", "==", id))
      );
      const statusUser = userData.docs[0].data().role;
      const logUser = userData.docs[0].data();
      if (statusUser === "employee") {
        const data = await getDocs(
          query(taskCollectionRef, 
            where("author.name", "==", logUser.email)
           )
        );
        const logData = await getDocs(
          query(taskCollectionRef,
            where("workers", "==",logUser.email))
        )
        setWorkerList(logData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setTaskLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        
        
      }
      if (statusUser === "admin") {
        const data = await getDocs(taskCollectionRef);
        setTaskLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    window.location.reload();
  };
  return (
    <div>
      {taskLists.map((task) => {
        return (
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>{task.title}</h1>
              </Card.Title>
              <Card.Text>{task.text}</Card.Text>
              <Card.Text>{task.remark}</Card.Text>
              <Card.Text>{task.author.name}</Card.Text>

              <Button
                onClick={() => {
                  deleteTask(task.id);
                }}
                className="btn btn-danger delete-button"
              >
                Excluir
              </Button>
            </Card.Body>
          </Card>
        );
      })}
      {workerList.map((workTask) => {
        return (
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>{workTask.title}</h1>
              </Card.Title>
              <Card.Text>{workTask.text}</Card.Text>
              <Card.Text>{workTask.remark}</Card.Text>
              <Card.Text>{workTask.author.name}</Card.Text>

              <Button
                onClick={() => {
                  deleteTask(workTask.id);
                }}
                className="btn btn-danger delete-button"
              >
                Excluir
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default Home;
