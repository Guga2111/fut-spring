import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";

async function fetchUsers() {
  return [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' }
  ];
}

export default function UserSearchDialog() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
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
            <Button type="button" size="sm" className="px-3 bg-green-600 text-white hover:bg-green-700">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ul className="mt-4 max-h-48 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map(user => (
              <li key={user.id} className="py-2 border-b last:border-none">
                {user.name}
              </li>
            ))
          ) : (
            <li className="py-2 text-sm text-gray-500">No user found.</li>
          )}
        </ul>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="bg-green-600 text-white hover:bg-green-700">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
