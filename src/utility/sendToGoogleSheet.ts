export async function sendToGoogleSheet(formData: any) {
    const token = import.meta.env.VITE_GOOGLE_SHEET_TOKEN;
    const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append?valueInputOption=RAW`;

    const body = {
        values: [
            [
                formData.pgName,
                formData.ownerName,
                formData.contactPerson,
                formData.mobile,
                formData.whatsapp,
                formData.email,
                formData.address,
                formData.category,
                formData.numberOfRooms,
                formData.deposit,
                formData.rentPerPerson,
                formData.roomType,
                formData.occupancy,
                formData.description,
                formData.amenities.join(", "),
                formData.images,
                formData.acceptTerms,
                formData.latitude,
                formData.longitude,
                formData.lightBillIncluded,
                new Date().toISOString(), // Created At
                // google map link
                formData.imagesIdss
            ]
        ]
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        console.log("Sheet Updated:", data);
        return data;
    } catch (err) {
        console.error("Sheet Error:", err);
        throw err;
    }
}


export async function getGoogleSheetData() {
    const token = import.meta.env.VITE_GOOGLE_SHEET_TOKEN;
    const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:Z`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (!data.values || data.values.length === 0) return [];

        // First row = headers
        const headers = data.values[0];

        // Remaining rows = PG entries
        const rows = data.values.slice(1);

        // Convert rows[][] → array of PG objects
        const pgList = rows.map((row: any[]) => {
            const obj: any = {};
            headers.forEach((key: string, i: number) => {
                obj[key] = row[i] ?? "";
            });
            return obj;
        });

        return pgList; // <-- final clean output
    } catch (err) {
        console.error("Google Sheet Fetch Error:", err);
        return [];
    }
}



export async function fetchSheetPublic() {
    const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const response = await fetch(url);
    const text = await response.text();

    const json = JSON.parse(text.substring(47, text.length - 2));

    return json.table.rows.map(r =>
        r.c.map(c => (c ? c.v : ""))
    );
}

export async function fetchSheetPublicAsObjects() {
    const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const response = await fetch(url);
    const text = await response.text();

    // Convert GViz JSON to normal JSON
    const json = JSON.parse(text.substring(47, text.length - 2));

    const rows = json.table.rows;
    const headers = json.table.cols.map(col => col.label || "");

    // Convert all rows into objects
    const data = rows.map(row => {
        const obj: any = {};

        row.c.forEach((cell, i) => {
            obj[headers[i]] = cell ? cell.v : "";
        });

        return obj;
    });

    return data;
}

