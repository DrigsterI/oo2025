import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { ScoreType, Tulemus } from "../models/Tulemus";

function Tulemused() {
  const [tulemused, setTulemused] = useState<Tulemus[]>([]);
  const [totalTulemused, setTotalTulemused] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tulemusedByPage, setTulemusedByPage] = useState(10);
  const [page, setPage] = useState(0);

  const showByPage = useCallback(
    (currentPage: number) => {
      setPage(currentPage);
      fetch(
        "http://localhost:8080/tulemusedPaged?size=" +
          tulemusedByPage +
          "&page=" +
          currentPage
      )
        .then((res) => res.json())
        .then((json) => {
          setTulemused(json.content);
          setTotalTulemused(json.totalElements);
          setTotalPages(json.totalPages);
        });
    },
    [tulemusedByPage]
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
          setTulemusedByPage(Number(productsByPageRef.current?.value))
        }
      >
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
      <br />
      <br />
      <div>Kokku tooteid: {totalTulemused} tk</div>
      <table border={1}>
        <tr>
          <th>ID</th>
          <th>Tupp</th>
          <th>Puktid</th>
          <th>Sportlane</th>
        </tr>
        {tulemused.map((tulemus) => (
          <tr key={tulemus.id}>
            <td>{tulemus.id}</td>
            <td>{ScoreType[tulemus.tupp]}</td>
            <td>{tulemus.punktid}</td>
            <td>{tulemus.sportlane?.nimi}</td>
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

export default Tulemused;
