import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Sona } from "../models/Sona";
import { Sonastik } from "../models/Sonastik";

function MainPage() {
  const [sonad, setSonad] = useState<Sona[]>([]);
  const [sonastikud, setSonastikud] = useState<Sonastik[]>([]);
  const [totalSonad, setTotalSonad] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sonadByPage, setSonadByPage] = useState(10);
  const [sonadSort, setSonadSort] = useState("asc");
  const [sonadFilter, setSonadFilter] = useState("");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const showByPage = useCallback(
    (currentPage: number) => {
      setPage(currentPage);
      fetch(
        "http://localhost:8080/sonadPaged?size=" +
        sonadByPage +
        "&page=" +
        currentPage +
        "&sort=type," +
        sonadSort +
        (search != "" ? "&search=" + search : "") +
        (sonadFilter != "null" && sonadFilter.trim() != "" ? "&filterSonastik=" + sonadFilter : "")
      )
        .then((res) => res.json())
        .then((json) => {
          setSonad(json.content);
          setTotalSonad(json.totalElements);
          setTotalPages(json.totalPages);
        });
    },
    [search, sonadByPage, sonadSort, sonadFilter]
  );

  useEffect(() => {
    fetch("http://localhost:8080/sonastikud")
      .then((res) => res.json())
      .then((json) => setSonastikud(json));
  }, []);

  useEffect(() => {
    showByPage(0);
  }, [showByPage]);

  function updatePage(newPage: number) {
    showByPage(newPage);
  }

  const sonadByPageRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);
  const filterRef = useRef<HTMLSelectElement>(null);


  return (
    <div>
      <label htmlFor="perPage">Per page</label>
      <select
        id="perPage"
        ref={sonadByPageRef}
        onChange={() =>
          setSonadByPage(Number(sonadByPageRef.current?.value))
        }
      >
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>

      <label htmlFor="sort">Sort</label>
      <select
        id="sort"
        ref={sortRef}
        onChange={() =>
          setSonadSort(sortRef.current?.value || "asc")
        }
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <br />
      <label htmlFor="filter">Filter</label>
      <select
        id="filter"
        ref={filterRef}
        onChange={() =>
          setSonadFilter(filterRef.current?.value || "asc")
        }
      >
        <option value="null">None</option>
        {sonastikud.map((sonastik) => (
          <option key={sonastik.id} value={sonastik.id}>
            {sonastik.name}
          </option>
        ))}
      </select>
      <label htmlFor="riik">Search</label>
      <input id="riik" type="text" onChange={(e) => setSearch(e.target.value)} />
      <br />
      <div>Kokku sõnu: {totalSonad} tk</div>
      <div style={{ padding: "1rem", fontWeight: "bold" }}>
        {sonad?.map((sona) => (
          <div>
            <a href={`/sona/${sona.typeID}`}>{sona.type}</a>
          </div>
        ))}
      </div>
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
    </div >
  );
}

export default MainPage;
