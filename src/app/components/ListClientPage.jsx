'use client';
import React, { useEffect, useState } from 'react';
import { Loader2, Edit2, Trash2, PlusCircle } from 'lucide-react';

const ListClientPage = ({ user }) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newList, setNewList] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [error, setError] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [existingGroups, setExistingGroups] = useState([]);
  const [selected, setSelected] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [editingList, setEditingList] = useState('');
  const [editingGroup, setEditingGroup] = useState('');
  const [editingStatus, setEditingStatus] = useState(false);
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/list', {
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
      const groups = [...new Set(data.list.map(item => item.group))];
      setExistingGroups(groups);
      setList(data.list);
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

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!newList.trim() || !newGroup.trim()) return;

    try {
      setAddingNew(true);
      const response = await fetch('/api/list/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, item: newList, group: newGroup }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add item');
      }

      setNewList('');
      setNewGroup('');
      setSelected(false);
      await fetchList();
    } catch (err) {
      setError(err.message);
    } finally {
      setAddingNew(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch('/api/list/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error(responseData.error || 'Failed to delete item');
      }

      await fetchList();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditingGroup(item.group);
    setEditingList(item.list);
    setEditingStatus(item.status);
  }

  const handleSaveEdit = async (id) => {
    setLoading(true);
    try {
      const response = await fetch('/api/list/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, list: editingList, group: editingGroup, status: editingStatus }),
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

  const handleToggleStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await fetch('/api/list/toggle-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: !status }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update status');
      }
      await fetchList();
    }
    catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredList = list?.filter(item => 
    selectedGroupFilter === 'all' ? true : item.group === selectedGroupFilter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-semibold text-blue-900 mb-8">{user.name} List</h1>
        
        <form onSubmit={handleAddList} className="space-y-4 mb-8 md:space-y-0 md:flex md:gap-4">
          <input
            type="text"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
            placeholder="Add new item..."
            disabled={addingNew}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <select
            value={newGroup}
            onChange={(e) => {
              const value = e.target.value;
              setNewGroup(value);
              setSelected(value !== '');
            }}
            disabled={addingNew}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Select Exsiting Group...</option>
            {existingGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {!selected && (
            <input
              type="text"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              placeholder="New group name..."
              disabled={addingNew}
              className="w-full md:w-1/4 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          )}
          <button
            type="submit"
            disabled={addingNew}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {addingNew ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : <>Add<PlusCircle className="h-5 w-5" /></>}
          </button>
        </form>
        <div className="mb-6">
          <select
            value={selectedGroupFilter}
            onChange={(e) => setSelectedGroupFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Groups</option>
            {existingGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
        ) : filteredList?.length > 0 ? (
          <div className="space-y-6">
            <ul className="divide-y divide-gray-100">
              {filteredList.map((item) => (
                <li key={item.id} className="py-4">
                  {editingId === item.id ? (
                    <div className="flex flex-wrap gap-4 items-center">
                      <input
                        type="text"
                        value={editingList}
                        onChange={(e) => setEditingList(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <input
                        type="text"
                        value={editingGroup}
                        onChange={(e) => setEditingGroup(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex-1 min-w-[200px]">
                        <div className="font-medium text-gray-900">{item.list}</div>
                        <div className="text-sm text-gray-500">{item.group}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            item.status
                              ? 'bg-black text-white hover:bg-gray-700'
                              : 'bg-black text-white hover:bg-gray-700'
                          }`}
                        >
                          {item.status ? 'At Laundry' : 'With you'}
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {list?.length === 0 
              ? "No items found in your list." 
              : "No items found in the selected group."}
          </div>
        )}
      </div>
    </div>
  );
}
export default ListClientPage;