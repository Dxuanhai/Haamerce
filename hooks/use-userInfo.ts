import { create } from "zustand";
import { toast } from "react-hot-toast";
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
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        ward: "",
        district: "",
        province: "",
      },
      add: (data: UserInfo) => {
        const currentUserInfo = get().userInfo;

        set({ userInfo: data });
        toast.success("Thêm Thông tin thành công.");
      },
    }),
    {
      name: "userInfo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserInfo;
