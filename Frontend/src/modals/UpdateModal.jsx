import { updateCodeSnippet } from "../services/api"; // API service for updating
import CreateUpdateInput from "../components/ui/CreateUpdateInput";
import { getUserId } from "../utils/utils";
import { useContext } from "react";
import { SnippetDataContext } from "../pages/HomePage"; // Import the context
import { toast } from "sonner";

const UpdateModal = ({ open, onOpenChange, initialData }) => {
  if (!open) {
    return null;
  }

  const userId = getUserId();
  const { setSnippetData, snippetData } = useContext(SnippetDataContext);

  const handleSubmit = async (updatedSnippetData) => {
    console.log("Updated snippet data:", updatedSnippetData);
    try {
      const response = await updateCodeSnippet(
        initialData,
        updatedSnippetData,
        userId
      );

      const updatedSnippet = response.data;
      setSnippetData(
        snippetData.map((snippet) =>
          snippet.id === updatedSnippet.id ? updatedSnippet : snippet
        )
      ); // Replace the old snippet with the updated one

      // Close the modal
      onOpenChange(false);
      toast.success("Snippet updated successfully");
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  return (
    <CreateUpdateInput
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={onOpenChange}
      initialData={initialData} // Prepopulate with existing data
      modalTitle="Update Snippet"
      submitButtonText="Update"
    />
  );
};

export default UpdateModal;
