"use client";
import { useMyInfo } from "@/app/service/auth/useAuthService";
export default function UserModify() {
  const { data: myInfo, error } = useMyInfo();
  console.log(myInfo, error);
  return <main>UserModify</main>;
}
