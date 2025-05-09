import { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Sonastik } from "../models/Sonastik";

function ManageSonastikstikud() {
  const [sonastikud, setSonastikstikud] = useState<Sonastik[]>([]);
  const [changing, setChanging] = useState<boolean>(false);
  const [changingIndex, setChangingIndex] = useState<number>(-1);

  useEffect(() => {
    fetch("http://localhost:8080/sonastikud")
      .then((res) => res.json())
      .then((json) => setSonastikstikud(json));
  }, []);

  const deleteSonastik = (id: number) => {
    fetch(`http://localhost:8080/sonastikud/${id}`, {
      method: "DELETE",
    }).then(() =>
      setSonastikstikud(sonastikud.filter((sonastik) => sonastik.id !== id))
    );
  };

  const nameRef = useRef<HTMLInputElement>(null);

  const addSonastik = () => {
    const newSonastik = {
      name: nameRef.current?.value,
    };

    fetch(`http://localhost:8080/sonastikud`, {
      method: "POST",
      body: JSON.stringify(newSonastik),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (
          json.message === undefined &&
          json.timestamp === undefined &&
          json.status === undefined
        ) {
          setSonastikstikud(json);
          toast.success("Uus sõnastik lisatud");
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Manage Sõnastikstikud</h2>
      <div>
        <div>
          <label>Name</label>
          <input ref={nameRef} type="text" />
        </div>
        <button onClick={addSonastik}>Add Sõnastik</button>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {sonastikud.map((sonastik) => (
            <tr key={sonastik.id}>
              <td>{sonastik.id}</td>
              <td>{sonastik.name}</td>
              <td>
                <button onClick={() => deleteSonastik(sonastik.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div >
  );
}

export default ManageSonastikstikud;
