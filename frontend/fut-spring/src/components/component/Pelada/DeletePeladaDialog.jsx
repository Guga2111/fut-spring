import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; 
import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";

  import axiosInstance from "../../../api/axiosInstance";

export default function DeletePeladaDialog({peladaId}) {

    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        
        if (!peladaId) {
            toast.error("ID of Pelada not found.");
            return;
        }

        setIsDeleting(true);

        try {
            await axiosInstance.delete(`/pelada/${peladaId}`);

            toast.success("Pelada was deleted with success!");

            navigate("/home");
        } catch (error) {
            console.error("Fail on deleting the pelada: ", error);
        } finally {
            setIsDeleting(false);
        }
    }

    return(
        <div>
            <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" aria-label="Delete pelada" className="hover:!border-white !text-neutral-100 hover:!text-white">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you have certain?</AlertDialogTitle>
          <AlertDialogDescription>
          This action cannot be undone. This will permanently delete
          this game and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} className="!bg-white !border-neutral-600 !text-neutral-700 hover:!bg-neutral-800 hover:!text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="!bg-red-600 hover:!bg-red-700" 
          >
            {isDeleting ? "Deleting..." : "Yes, delete pelada"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </div>
    )
}