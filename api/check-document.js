export default async function handler(req, res) {

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Método no permitido."
        });
    }

    const documento = (req.query.documento || "").trim();

    if (!documento) {
        return res.status(400).json({
            success: false,
            message: "Debe enviar el documento."
        });
    }

    try {

        const url =
            "https://script.google.com/macros/s/AKfycbyqjFT0XDCI2lAgpmGNrpgkgWjun1z9RjMubf_uQQXeMrT9aPW7RsCZoN36ZLWrFfz3-g/exec?documento=" +
            encodeURIComponent(documento);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Apps Script respondió con " + response.status);
        }

        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error consultando la base de datos."
        });

    }

}