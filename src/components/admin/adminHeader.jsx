import { createContext, useContext, useEffect } from "react";

export const AdminHeaderContext = createContext({
    setContent: () => {},
});

export function useSetAdminHeader(content) {
    const { setContent } = useContext(AdminHeaderContext);

    useEffect(() => {
        setContent(content);

        return () => setContent(null);
    }, [content, setContent]);
}
