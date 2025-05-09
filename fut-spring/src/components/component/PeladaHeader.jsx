

import { Plus } from 'lucide-react';


import UserSearchDialog from "./UserSearchDialog";
import UserShareDialog from "./UserShareDialog";

export default function PeladaHeader({ peladaData }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
      <h1 className="font-extrabold text-xl">{peladaData.name}</h1>
      <h4 className="font-extrabold text-gray-700">{peladaData.reference}, {peladaData.address}</h4>
      </div>
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
