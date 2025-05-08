import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Sportlane } from "../models/Sportlane";

function MainPage() {
  const [sportlased, setSportlased] = useState<Sportlane[]>([]);
  const [totalSportlased, setTotalSportlased] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sportlasedByPage, setSportlasedByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [riik, setRiik] = useState("");

  const showByPage = useCallback(
    (currentPage: number) => {
      setPage(currentPage);
      fetch(
        "http://localhost:8080/sportlasedFilteredPaged?size=" +
          sportlasedByPage +
          "&page=" +
          currentPage +
          "&riik=" +
          riik
      )
        .then((res) => res.json())
        .then((json) => {
          setSportlased(json.content);
          setTotalSportlased(json.totalElements);
          setTotalPages(json.totalPages);
        });
    },
    [riik, sportlasedByPage]
  );

  useEffect(() => {
    showByPage(0);
  }, [showByPage]);

  function updatePage(newPage: number) {
    showByPage(newPage);
  }

  const productsByPageRef = useRef<HTMLSelectElement>(null);

  return (
    <div>
      <label htmlFor="perPage">Per page</label>
      <select
        id="perPage"
        ref={productsByPageRef}
        onChange={() =>
          setSportlasedByPage(Number(productsByPageRef.current?.value))
        }
      >
        <option>1</option>
        <option>3</option>
        <option>6</option>
      </select>
      <br />
      <label htmlFor="riik">Riik</label>
      <input id="riik" type="text" onChange={(e) => setRiik(e.target.value)} />
      <br />
      <div>Kokku tooteid: {totalSportlased} tk</div>
      <table border={1}>
        <tr>
          <th>ID</th>
          <th>Nimi</th>
          <th>Riik</th>
          <th>Vanus</th>
          <th>Puktid</th>
        </tr>
        {sportlased.map((sportlane) => (
          <tr key={sportlane.id}>
            <td>{sportlane.id}</td>
            <td>{sportlane.nimi}</td>
            <td>{sportlane.riik}</td>
            <td>{sportlane.vanus}</td>
            <td>{sportlane.punktid}</td>
          </tr>
        ))}
      </table>
      <button disabled={page <= 0} onClick={() => updatePage(page - 1)}>
        Eelmine
      </button>
      <span>
        {page + 1} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages - 1}
        onClick={() => updatePage(page + 1)}
      >
        Järgmine
      </button>
    </div>
  );
}

export default MainPage;
