import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { auth } from "../firebase";

export function getUser() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
            setUser(authUser);
        }
        
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}
