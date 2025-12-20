export async function sendToBackend(formData: any) {

    const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
    const url = `${backendDomain}/api/sheet/add`;

    const row = [
        "123",
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
        formData.images.join(", "),
        formData.acceptTerms ? "TRUE" : "FALSE",
        formData.latitude,
        formData.longitude,
        formData.lightBillIncluded === "included" ? "TRUE" : "FALSE",
        new Date().toISOString(),
        formData.imagesIds,
        formData.googleMapLink
    ];

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(row)
    });

    return await res.text();
}


export async function getGoogleSheetData() {
    const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
    const url = `${backendDomain}/api/sheet/read`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch PG data");
        }

        const data = await res.json();

        // Normalize backend response for frontend use
        return data.map((row: any) => ({
            id: Number(row.id) || 0,
            pgName: row.pgName || "",
            ownerName: row.ownerName || "",
            contactPerson: row.contactPerson || "",
            mobile: row.mobile || "",
            whatsapp: row.whatsapp || "",
            email: row.email || "",
            address: row.address || "",
            category: row.category || "",
            numberOfRooms: row.numberOfRooms || "",
            deposit: row.deposit || "",
            rentPerPerson: row.rentPerPerson || "",
            roomType: row.roomType || "",
            occupancy: row.occupancy || "",
            description: row.description || "",
            amenities: row.amenities
                ? row.amenities.split(",").map((a: string) => a.trim())
                : [],
            images: row.images
                ? row.images.split(",").map((img: string) => img.trim())
                : [],
            acceptTerms: row.acceptTerms === "TRUE",
            latitude: row.latitude ? Number(row.latitude) : null,
            longitude: row.longitude ? Number(row.longitude) : null,
            lightBillIncluded:
                row.lightBillIncluded === "TRUE" || row.lightBillIncluded === "included",
            createdAt: row.createdAt || "",
            imagesIds: row.imagesIdss || row.imagesIds || "",
            googleMapLink: row.googleMapLink || ""
        }));
    } catch (err) {
        console.error("Backend Fetch Error:", err);
        return [];
    }
}




