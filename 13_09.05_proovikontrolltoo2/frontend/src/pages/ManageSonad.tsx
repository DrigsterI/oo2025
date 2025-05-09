import { useEffect, useState } from "react";
import { Sona } from "../models/Sona";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Sonastik } from "../models/Sonastik";

function ManageSonad() {
  const [sonad, setSonad] = useState<Sona[]>([]);
  const [sonastikud, setSonastikud] = useState<Sonastik[]>([]);
  const [changingDescription, setChangingDescription] = useState<boolean>(false);
  const [changingDescriptionIndex, setChangingDescriptionIndex] = useState<number>(-1);
  const [changingSonastik, setChangingSonastik] = useState<boolean>(false);
  const [changingSonastikIndex, setChangingSonastikIndex] = useState<number>(-1);

  useEffect(() => {
    fetch("http://localhost:8080/sonad")
      .then((res) => res.json())
      .then((json) => setSonad(json));

    fetch("http://localhost:8080/sonastikud")
      .then((res) => res.json())
      .then((json) => setSonastikud(json));
  }, []);

  const deleteSona = (id: number) => {
    fetch(`http://localhost:8080/sonad/${id}`, {
      method: "DELETE",
    }).then(() =>
      setSonad(sonad.filter((sona) => sona.typeID !== id))
    );
  };

  const editDescription = (id: number, description: string) => {
    fetch(`http://localhost:8080/sonad/${id}?field=description&value=` + description, {
      method: "PATCH",
    }).then(() =>
      setSonad(sonad)
    );
  };

  const editSonastik = (id: number, sonastik: number) => {
    fetch(`http://localhost:8080/sonad/${id}?field=sonastik&value=` + sonastik, {
      method: "PATCH",
    }).then(() =>
      setSonad(sonad)
    );
  };


  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const sonastikRef = useRef<HTMLSelectElement>(null);
  const changindDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const changindSonastikRef = useRef<HTMLSelectElement>(null);

  const addSona = () => {
    const newSona = {
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
      sonastik: sonastikRef.current?.value,
    };

    fetch(`http://localhost:8080/sonad`, {
      method: "POST",
      body: JSON.stringify(newSona),
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
          setSonad(json);
          toast.success("Uus sõna lisatud");
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Manage Sonad</h2>
      <div>
        <div>
          <label>Type</label>
          <input ref={typeRef} type="text" />
        </div>
        <div>
          <label>Description</label>
          <textarea ref={descriptionRef} />
        </div>
        <div>
          <label>Sõnastik</label>
          <select ref={sonastikRef}>
            {sonastikud.map((sonastik) => (
              <option key={sonastik.id} value={sonastik.id}>
                {sonastik.name}
              </option>
            ))}
          </select>
          <button onClick={addSona}>Add Sona</button>
        </div>

        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Sõnastik</th>
            </tr>
          </thead>
          <tbody>
            {sonad.map((sona) => (
              <tr key={sona.typeID}>
                <td>{sona.typeID}</td>
                <td>{sona.type}</td>
                {changingDescription && sona.typeID === changingDescriptionIndex ? (
                  <td style={{ display: "flex" }}>
                    <textarea ref={changindDescriptionRef} defaultValue={sona.description} style={{ width: "100%" }} />
                    <button onClick={() => {
                      setChangingDescription(false); editDescription(sona.typeID, changindDescriptionRef.current?.value || sona.description); sona.description = changindDescriptionRef.current?.value || sona.description;
                    }}>Save</button>
                    <button onClick={() => { setChangingDescription(false) }}>Abort</button>
                  </td>
                ) : (
                  <td>{sona.description}<button onClick={() => { setChangingDescription(true); setChangingDescriptionIndex(sona.typeID) }}>Change</button></td>
                )}
                {changingSonastik && sona.typeID === changingSonastikIndex ? (
                  <td style={{ display: "flex" }}>
                    <select ref={changindSonastikRef}>
                      {sonastikud.map((sonastik) => (
                        <option key={sonastik.id} value={sonastik.id}>
                          {sonastik.name}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => {
                      setChangingSonastik(false); editSonastik(sona.typeID, Number(changindSonastikRef.current?.value) || -1); sona.sonastik = sonastikud.find((sonastik) => sonastik.id === Number(changindSonastikRef.current?.value)) || null;
                    }}>Save</button>
                    <button onClick={() => { setChangingSonastik(false) }}>Abort</button>
                  </td>
                ) : (
                  <td>{sona.sonastik?.name || "-"}<button onClick={() => { setChangingSonastik(true); setChangingSonastikIndex(sona.typeID) }}>Change</button></td>
                )}
                <td>
                  <button onClick={() => deleteSona(sona.typeID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div >
    </div>
  );
}

export default ManageSonad;
