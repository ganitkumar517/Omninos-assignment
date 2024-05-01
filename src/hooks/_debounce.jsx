import { useState } from "react";
import { useEffect } from "react";

export default function useDebounce({ inputValue, delay }) {
    const [debounceValue, setDebounceValue] = useState(inputValue);
    useEffect(() => {
        const id = setTimeout(() => {
            setDebounceValue(inputValue);
        }, [delay]);
        return () => clearInterval(id);
    }, [inputValue]);
    return debounceValue;
}
