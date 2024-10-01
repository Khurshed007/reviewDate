

import { collection, deleteDoc, getDocs, doc } from "firebase/firestore"
import { database } from "../firebaseConfig/firebaseConfig"
import { useEffect, useState } from "react"

export const DeleteButton = () => {
     const [users, setUsers] = useState([]);
 const dbInstance = collection(database, "users")
 const getData = async () => {
    const data = await getDocs(dbInstance);
    setUsers(
      data.docs.map((e) => {
        return { ...e.data(), id: e.id };
      })
    );
  };

  const deleteData = (id) => {
    let dataToUpdate = doc(dbInstance, id);
    console.log("id", id);
    deleteDoc(dataToUpdate)
      .then(() => {
        window.location.reload();
        alert("Data u[dated");
      })
      .catch((err) => alert(err));
  };

useEffect(() => {
  getData()
}, [])
    return (
        <>
         <h1>Main</h1>
         {users.map((e) => (
         <>
           <div>
             <p>{e.name}</p>
           <p>{e.password}</p>
            <p>{e.email}</p>
            <button onClick={() => deleteData(e.id)}>delete</button>
          </div>
         </>
       ))}
        </>
    )
}