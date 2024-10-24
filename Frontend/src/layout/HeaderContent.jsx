import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { logStatusContext } from "../App";
import ThemeToggle from "../components/ThemeToggle";
import { Button } from "@/components/ui/button";
import CreateModal from "../modals/CreateModal";
import LogoutButton from "../components/LogoutButton";
import SearchSnippets from "../components/SearchSnippets";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { getUserId } from "@/utils/utils";
import { getUserById, deleteUserByEmail } from "@/services/api";

const HeaderContent = ({ onSearch, onTagFilter, onLanguageFilter }) => {
  // State and context hooks
  const [open, setOpen] = useState(false);
  const { setIsLoggedIn } = useContext(logStatusContext);
  const navigate = useNavigate();
  const userId = getUserId();
  const [user, setUser] = useState(null);

  // Handler for logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserByEmail(user?.email);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await getUserById(userId);
        if (response) {
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserDetails();
  }, [userId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-4 bg-background py-6 px-4 md:px-8 lg:px-16 flex justify-between items-center gap-4 md:gap-12 ">
      {/* User details and logout button */}
      <Popover>
        <PopoverTrigger>
          <LuUser2 size={30} />
        </PopoverTrigger>
        <PopoverContent
          className="mt-2 flex flex-col gap-2 items-center"
          align="start"
        >
          {/* User Name */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-red-500 text-xl font-bold text-white">
            {user?.name.charAt(0).toUpperCase()}
          </div>

          <p className="font-bold text-lg">{user?.name}</p>

          <ThemeToggle />
          <LogoutButton onLogout={handleLogout} />

          {/* Delete Account */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteUser}>
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>

      {/* Search component */}
      <SearchSnippets
        onSearch={onSearch}
        onTagFilter={onTagFilter}
        onLanguageFilter={onLanguageFilter}
      />

      {/* Create button to open the modal */}
      <Button onClick={() => setOpen(true)} className="text-sm  md:text-lg">
        Create
      </Button>

      {/* Modal for creating snippets */}
      <CreateModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default HeaderContent;
