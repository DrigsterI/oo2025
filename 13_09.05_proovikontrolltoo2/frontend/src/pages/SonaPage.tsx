import { useEffect, useState } from "react";
import { Sona } from "../models/Sona";
import { useParams } from "react-router";

function SonaPage() {
    let params = useParams();

    const [sona, setSona] = useState<Sona>();

    useEffect(
        () => {
            fetch("http://localhost:8080/sonad/" + params.sonaId)
                .then((res) => res.json())
                .then((json) => {
                    setSona(json);
                });
        }, []
    );

    return (
        <div style={{ padding: "1rem", fontWeight: "bold" }}>
            <div>ID: <span style={{ fontWeight: "normal" }}>{sona?.typeID}</span></div>
            <div>Type: </div>
            <div style={{ fontWeight: "normal" }}>{sona?.type}</div>
            <div>Description:</div>
            <div style={{ fontWeight: "normal", maxWidth: "60%", margin: "0 auto" }}>{sona?.description || "Ei ole"}</div>
            <div>Sõnastik: </div>
            <div style={{ fontWeight: "normal" }}>{sona?.sonastik?.name || "Ei ole"}</div>
        </div>
    );
}

export default SonaPage;
