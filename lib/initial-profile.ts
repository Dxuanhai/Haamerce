import getProduct from "@/actions/get-product";
import { createProfile, getProfile } from "@/actions/profile";
import { currentUser } from "@clerk/nextjs/server";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return "haha";
  } else {
    const profile = await getProfile(user.id);

    if (profile) return profile;
    else {
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
