"use client";
import { UserAuth } from "~/context/AuthContext";

export default function Header() {
  const { user, GoogleSignIn, logOut } = UserAuth();

  const handleSignOut = (event: any) => {
    event.preventDefault();
    logOut();
  };

  const handleSignIn = (event: any) => {
    event.preventDefault();
    GoogleSignIn();
  };

  return (
    <header className="rounded-md bg-slate-100 shadow-md">
      {user ? (
        <div className="flex justify-between">
          <div className="flex items-center space-x-10">
            <div className="ml-4 flex items-center font-mono text-4xl font-bold">
              <a href="/">AviAI</a>
            </div>
            <div>
              <a href="/gallery">Gallery</a>
            </div>
          </div>
          <div className="mr-4 flex items-center justify-end py-8">
            <div className="flex items-center justify-center space-x-4">
              <p className="font-semibold">{user.displayName}</p>

              <a href="#" onClick={handleSignOut}>
                <button className="ml-4 rounded-md bg-red-100 px-4 py-2 shadow-md">
                  Sign Out
                </button>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex items-center space-x-12">
            <div className="ml-4 flex items-center font-mono text-4xl font-bold">
              <a href="/">AviAI</a>
            </div>
            <div>
              <a href="/gallery">Gallery</a>
            </div>
          </div>
          <div className="flex items-center justify-end py-8">
            <div className="flex  mr-4 items-center justify-center space-x-4">
              <a href="#" onClick={handleSignIn}>
                <button className="ml-4 rounded-md bg-red-100 px-4 py-2 shadow-md">
                  Sign In
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
