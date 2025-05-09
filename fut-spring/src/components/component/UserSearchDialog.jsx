import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { Plus, Search } from "lucide-react";

export default function UserSearchDialog({peladaData}) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNotUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/pelada/${peladaData.id}/not-users`
      );
      console.log("Fetched not-users:", response.data);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching not-users:", err);
      setError("Não foi possível carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:8080/pelada/${peladaData.id}/user/${userId}`
      );
      // Refresh
      getNotUsers();  
    } catch (err) {
      console.error(`Error adding user ${userId}:`, err);
      setError("Não foi possível adicionar o usuário.");
    }
  };

  useEffect(() => {
    if (open) {
      getNotUsers();
    }
  }, [open, peladaData.id]);

  const filtered = users.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="!bg-green-600 !text-white hover:!bg-green-700 hover:!border-white" onClick={() => setOpen(true)}>
          <Plus className="" /> Include
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Users</DialogTitle>
          <DialogDescription>Type to search for the avaible users.</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Label htmlFor="user-search" className="block mb-1">Search</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="user-search"
              placeholder="Username..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Button type="button" size="sm" className="px-3 bg-green-600 text-white hover:!bg-green-700">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ul className="mt-4 max-h-48 overflow-y-auto">
          {loading && <li className="py-2 text-sm">Loading...</li>}
          {error && <li className="py-2 text-sm !text-red-600">{error}</li>}
          {!loading && !error && (filtered.length > 0 ? (
            filtered.map(user => (
              <li key={user.id} className="py-2 border-b last:border-none flex justify-between items-center">
                <span>{user.username}</span>
                <Button
                  size="xs"
                  className="bg-transparent hover:!bg-green-600 hover:!border-white"
                  onClick={() => addUser(user.id)}
                >
                  <Plus className="w-4 h-4 text-white" />
                </Button>
              </li>
            ))
          ) : (
            <li className="py-2 text-sm text-gray-500">No user found.</li>
          ))}
        </ul>


        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
