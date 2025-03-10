'use client';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function MainPage({ user }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingList, setEditingList] = useState('');
    const [error, setError] = useState(null);

    const fetchList = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/remainder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to fetch list');
            }

            const data = await response.json();
            setList(data.list);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditingList(item.list);
    };

    const handleSaveEdit = async (id) => {
        try {
            setLoading(true);
            const response = await fetch('/api/remainder/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, list: editingList }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update item');
            }
            setEditingId('');
            await fetchList();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchList();
        }
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-semibold text-blue-900 mb-8">{user.name} List</h1>
                <ul>
                    {list.map((item) =>
                        editingId === item.id ? (
                            <li key={item.id} className="py-4">
                                <input
                                    type="text"
                                    value={editingList}
                                    onChange={(e) => setEditingList(e.target.value)}
                                    className="border rounded-md p-2 w-full"
                                />
                                <button
                                    onClick={() => handleSaveEdit(item.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                                >
                                    Save
                                </button>
                            </li>
                        ) : (
                            <li
                                key={item.id}
                                onClick={() => handleEdit(item)}
                                className="py-4 cursor-pointer"
                            >
                                {item.list}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}
