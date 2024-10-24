import { LuTrash } from "react-icons/lu";
import { deleteCodeSnippet } from "../services/api";
import { getUserId } from "../utils/utils";
import { useContext } from "react";
import { toast } from "sonner";
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
import { SnippetDataContext } from "../pages/HomePage";

const DeleteSnippet = ({ snippetId }) => {
  const userId = getUserId();
  const { setSnippetData, snippetData } = useContext(SnippetDataContext);

  const handleDelete = async (e) => {
    if (e) {
      e.stopPropagation();
    }

    try {
      await deleteCodeSnippet(snippetId, userId);

      // Update the state to remove the deleted snippet
      setSnippetData(snippetData.filter((snippet) => snippet.id !== snippetId));

      toast("Snippet deleted successfully");
    } catch (error) {
      console.error("Failed to delete snippet:", error);
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
        <LuTrash className="cursor-pointer text-muted-foreground hover:text-foreground hover:scale-125 transition-all" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            snippet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSnippet;
