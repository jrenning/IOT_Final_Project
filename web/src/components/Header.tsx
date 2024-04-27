"use client";
import { useState } from "react";
import { UserAuth } from "~/context/AuthContext";

export default function Header() {
  const { user, EmailPasswordSignIn, logOut } = UserAuth();

  const [clicked, setClicked] = useState(false);
  const handleSignOut = (event: any) => {
    event.preventDefault();

    logOut();
  };

  const handleSignIn = (event: any) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    EmailPasswordSignIn(target.email.value, target.password.value)
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
        <>
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
              <div className="mr-4  flex items-center justify-center space-x-4">
                <a href="#" onClick={() => setClicked(true)}>
                  <button className="ml-4 rounded-md bg-red-100 px-4 py-2 shadow-md">
                    Sign In
                  </button>
                </a>
              </div>
            </div>
          </div>
          {clicked && (
            <div className="fixed z-50 h-screen w-screen backdrop-blur-sm backdrop-grayscale">
              <div className="fixed left-0 right-0 top-[10%]">
                <div className="mx-2 flex h-[45vh] rounded-lg bg-gray-100 shadow-md md:mx-[25%]">
                  <div className="flex w-full flex-col items-center">
                    <header className="flex w-full justify-between">
                      <div></div>
                      <div className="text-xl font-semibold">Sign In</div>
                      <button className="rounded-md bg-red-200 px-2 py-1 shadow-md" onClick={()=> setClicked(false)}>
                        X
                      </button>
                    </header>
                    <form
                      className="items-center justify-center space-y-8"
                      onSubmit={handleSignIn}
                    >
                      <div className="flex flex-col">
                        <label>Email</label>
                        <input type="email" id="email" name="email" required={true} />
                      </div>
                      <div className="flex flex-col">
                        <label>Password</label>
                        <input type="password" id="password" name="password" required={true} />
                      </div>
                      <div>
                        <button className="rounded-md bg-white px-2 py-1 shadow-md">
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
}
