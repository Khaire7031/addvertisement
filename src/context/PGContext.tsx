import { createContext, useContext, useEffect, useState } from "react";
import { getGoogleSheetData } from "../utility/sendToGoogleSheet";

const PGContext = createContext<any>(null);

export const PGProvider = ({ children }: { children: React.ReactNode }) => {
    const [pgList, setPgList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const data = await getGoogleSheetData();
            console.log("Data : ", data)
            setPgList(data);
            setLoading(false);
        }
        loadData();
    }, []);

    return (
        <PGContext.Provider value={{ pgList, loading }}>
            {children}
        </PGContext.Provider>
    );
};

// custom hook (VERY important)
export const usePGData = () => useContext(PGContext);
