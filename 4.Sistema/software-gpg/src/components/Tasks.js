import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { Card, Button } from "react-bootstrap";
import { auth, db } from "../firebase";

function Home() {
  const [taskLists, setTaskLists] = useState([]);
  const taskCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(query(taskCollectionRef, where ("workers" , "==", localStorage.getItem("uid")))) 
      
      setTaskLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
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

              <Button
                onClick={() => {
                  deleteTask(task.id);
                }}
                className="btn btn-danger"
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
