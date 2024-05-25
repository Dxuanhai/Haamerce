import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

import { UserInfo } from "@/types";

interface UserStore {
  userInfo: UserInfo;
  add: (data: UserInfo) => void;
}
const useUserInfo = create(
  persist<UserStore>(
    (set, get) => ({
      userInfo: {
        profileId: "sdsd",
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        paymentMethod: "",
        ward: "",
        district: "",
        province: "",
      },
      add: (data: UserInfo) => {
        set((state) => ({
          ...state,
          userInfo: data,
          profileId: data.profileId,
        }));
      },
    }),
    {
      name: "userInfo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserInfo;
