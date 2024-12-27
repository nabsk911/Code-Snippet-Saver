import React, { useState, useContext, useEffect } from "react";
import { LuUser2 } from "react-icons/lu";
import { logStatusContext } from "../App";
import LogoutButton from "../components/LogoutButton";
import ThemeToggle from "../components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

const UserButton = () => {
  const userId = getUserId();
  const [user, setUser] = useState(null);
  const { setIsLoggedIn } = useContext(logStatusContext);

  // Function to delete the user account
  const handleDeleteUser = async () => {
    try {
      await deleteUserByEmail(user?.email);
      localStorage.removeItem("user");
      toast.info("Account deleted successfully");
      setIsLoggedIn(false);
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
    <div>
      {" "}
      <Popover>
        <PopoverTrigger>
          <LuUser2
            size={47}
            className="bg-foreground text-background rounded-full p-2 cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent
          className="mt-2 flex flex-col gap-2 items-center"
          align="start"
        >
          {/* User Name */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-red-500 text-xl font-bold text-white">
            {user?.name.charAt(0).toUpperCase()}
          </div>

          <p className="text-lg">{user?.name}</p>

          <ThemeToggle />
          <LogoutButton />

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
    </div>
  );
};

export default UserButton;
