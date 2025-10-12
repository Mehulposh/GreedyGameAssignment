"use client"

import React, { useState, useEffect } from 'react';
import { CiFilter } from "react-icons/ci";
import { supabase } from '@/lib/supabaseClient';

export default function UserManagement() {
  
  const [users, setUsers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('10/08/2023 18:00');
  const [loading, setLoading] = useState(false);

  // Fetch users from Supabase
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
            
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, role')
        .order('name');
      
      if (error) throw error;
      setUsers(data);
      
      setLastUpdated(new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'super_user' ? 'user' : 'super_user';
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      setLastUpdated(new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
      
      
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const getRoleDisplay = (role) => {
    return role === 'super_user' ? 'Super User' : 'User';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 w-full">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">All Users</h1>
              <p className="text-sm text-gray-500 mt-1">
                Last Updated - {lastUpdated}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
               <CiFilter className="text-green-300 font-bold text-lg"/>
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors">
                <span>+</span>
                Add Users
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role ⇅
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {getRoleDisplay(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserRole(user.id, user.role)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          user.role === 'super_user'
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={user.role === 'super_user'}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            user.role === 'super_user'
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}