import { useEffect, useState } from "react";
import { getEnumKeys, ScoreType, Tulemus } from "../models/Tulemus";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Sportlane } from "../models/Sportlane";

function ManageTulemused() {
  const [tulemused, setTulemused] = useState<Tulemus[]>([]);
  const [sportlased, setSportlased] = useState<Sportlane[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/tulemused")
      .then((res) => res.json())
      .then((json) => {
        setTulemused(json);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/sportlased")
      .then((res) => res.json())
      .then((json) => setSportlased(json));
  }, []);

  const deleteTulemus = (id: number) => {
    fetch(`http://localhost:8080/tulemused/${id}`, {
      method: "DELETE",
    }).then(() =>
      setTulemused(tulemused.filter((tulemus) => tulemus.id !== id))
    );
  };

  const tuppRef = useRef<HTMLSelectElement>(null);
  const punktidRef = useRef<HTMLInputElement>(null);
  const sportlaneRef = useRef<HTMLSelectElement>(null);

  const addTulemus = () => {
    const newTulemus = {
      tupp: tuppRef.current?.value,
      punktid: punktidRef.current?.value,
      sportlane: {
        id: sportlaneRef.current?.value,
      },
    };

    fetch(`http://localhost:8080/tulemused`, {
      method: "POST",
      body: JSON.stringify(newTulemus),
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
          setTulemused(json);
          toast.success("Uus toode lisatud");
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Manage Tulemused</h2>
      <div>
        <div>
          <label>Tupp</label>
          <select ref={tuppRef}>
            {getEnumKeys(ScoreType).map((key, index) => (
              <option key={index} value={key}>
                {ScoreType[key]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Punktid</label>
          <input ref={punktidRef} type="number" />
        </div>
        <div>
          <label>Sportlane</label>
          <select ref={sportlaneRef}>
            {sportlased.map((sportlane) => (
              <option key={sportlane.id} value={sportlane.id}>
                {sportlane.nimi}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addTulemus}>Add Tulemus</button>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nimi</th>
            <th>Tupp</th>
            <th>Punktid</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {tulemused.map((tulemus) => (
            <tr key={tulemus.id}>
              <td>{tulemus.id}</td>
              <td>{ScoreType[tulemus.tupp]}</td>
              <td>{tulemus.punktid}</td>
              <td>{tulemus.sportlane?.nimi}</td>
              <td>
                <button onClick={() => deleteTulemus(tulemus.id)}>
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

export default ManageTulemused;
