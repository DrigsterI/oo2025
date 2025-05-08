import { useEffect, useState } from "react";
import { Sportlane } from "../models/Sportlane";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

function ManageSportlased() {
  const [sportlased, setSportlased] = useState<Sportlane[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/sportlased")
      .then((res) => res.json())
      .then((json) => setSportlased(json));
  }, []);

  const deleteSportlane = (id: number) => {
    fetch(`http://localhost:8080/sportlased/${id}`, {
      method: "DELETE",
    }).then(() =>
      setSportlased(sportlased.filter((sportlane) => sportlane.id !== id))
    );
  };

  const nimiRef = useRef<HTMLInputElement>(null);
  const riikRef = useRef<HTMLInputElement>(null);
  const vanusRef = useRef<HTMLInputElement>(null);

  const addSportlane = () => {
    const newSportlane = {
      nimi: nimiRef.current?.value,
      riik: riikRef.current?.value,
      vanus: vanusRef.current?.value,
    };

    fetch(`http://localhost:8080/sportlased`, {
      method: "POST",
      body: JSON.stringify(newSportlane),
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
          setSportlased(json);
          toast.success("Uus toode lisatud");
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Manage Sportlased</h2>
      <div>
        <div>
          <label>Nimi</label>
          <input ref={nimiRef} type="text" />
        </div>
        <div>
          <label>Riik</label>
          <input ref={riikRef} type="text" />
        </div>
        <div>
          <label>Vanus</label>
          <input ref={vanusRef} type="number" />
        </div>
        <button onClick={addSportlane}>Add Sportlane</button>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nimi</th>
            <th>Riik</th>
            <th>Vanus</th>
            <th>Punktid</th>
          </tr>
        </thead>
        <tbody>
          {sportlased.map((sportlane) => (
            <tr key={sportlane.id}>
              <td>{sportlane.id}</td>
              <td>{sportlane.nimi}</td>
              <td>{sportlane.riik}</td>
              <td>{sportlane.vanus}</td>
              <td>{sportlane.punktid}</td>
              <td>
                <button onClick={() => deleteSportlane(sportlane.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ManageSportlased;
