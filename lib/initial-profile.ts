import { createProfile, getProfile } from "@/actions/profile";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  } else {
    const profile = await getProfile(user.id);

    if (profile) {
      return profile;
    } else {
      const newProfile = await createProfile(
        user.firstName,
        user.lastName,
        user.id,
        user.imageUrl
      );

      return newProfile;
    }
  }
};