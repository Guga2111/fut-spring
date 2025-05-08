

import { Plus } from 'lucide-react';


import UserSearchDialog from "./UserSearchDialog";
import UserShareDialog from "./UserShareDialog";

export default function PeladaHeader({ peladaData }) {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="font-extrabold text-xl">{peladaData.name}</h1>
      <div className="flex space-x-2">
        <div>
            <UserSearchDialog></UserSearchDialog>
        </div>
        <div>
            <UserShareDialog peladaData={peladaData}></UserShareDialog>
        </div>
        
      </div>
    </div>
  );
}
