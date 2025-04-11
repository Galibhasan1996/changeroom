import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "../../Hook/Auth/useAuth";
import { UserStorage } from "../../store/Store";

export const LockerContext = createContext();

export const LockerProvider = ({ children }) => {
    const { getAllLocker } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);

    const token = UserStorage.getItem("token");

    // Fetch lockers function
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getAllLocker(limit, page, token);
            setData(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when page/limit changes
    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <LockerContext.Provider value={{ data, loading, page, setPage, fetchData }}>
            {children}
        </LockerContext.Provider>
    );
};

// Custom hook for accessing locker data
export const useLocker = () => {
    return useContext(LockerContext);
};
