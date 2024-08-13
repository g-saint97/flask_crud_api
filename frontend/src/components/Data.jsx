import React, { useState, useEffect } from 'react';

const Data = () => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const fetchData = async () => {
        try {
            const res = await fetch("http://127.0.0.1:5000/contacts");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const jsonData = await res.json();
            setData(jsonData);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(); 
    }, []);  

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {data && data.map(contact => (
                <div key={contact.id}>{contact.name}</div> 
            ))}
        </div>
    );
}

export default Data;
