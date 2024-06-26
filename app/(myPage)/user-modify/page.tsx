"use client";
import UserInfoForm from "@/app/_components/UserInfoForm";
import useLoadingMutation from "@/app/_hooks/useLoadingMutation";
import { useMyInfo } from "@/app/_service/auth/useAuthService";
import useUserInfoModify from "./_fetcher/useUserInfoModify";
import { Direction } from "@/app/_components/block/Form/Form";
import ProfileImageEditor from "./_components/ProfileImageEditor";
import SubTitle from "../_components/SubTitle";

export default function UserModify() {
  const { data: myInfo, isSuccess } = useMyInfo();
  const submit = useUserInfoModify();
  const mutation = useLoadingMutation(submit);

  return (
    <>
      <SubTitle title="회원정보 수정" />
      <ProfileImageEditor photoUrl={myInfo?.data?.profilePhoto} />
      <UserInfoForm
        isLoaded={isSuccess}
        mutation={mutation}
        direction={Direction.ROW}
        submitButtonLabel="비밀번호 변경"
        use={["password"]}
      />
      <UserInfoForm
        isLoaded={isSuccess}
        mutation={mutation}
        direction={Direction.ROW}
        submitButtonLabel="이름 변경"
        use={["name"]}
        defaultValues={{
          name: myInfo?.data?.name,
        }}
      />

      <UserInfoForm
        isLoaded={isSuccess}
        mutation={mutation}
        direction={Direction.ROW}
        submitButtonLabel="연락처 변경"
        use={["phone"]}
        defaultValues={{
          phone: myInfo?.data?.phone,
        }}
      />
      <UserInfoForm
        isLoaded={isSuccess}
        mutation={mutation}
        direction={Direction.ROW}
        submitButtonLabel="주소 변경"
        use={["address"]}
        defaultValues={{
          zonecode: myInfo?.data?.address.split("/")[0] || "",
          address: myInfo?.data?.address.split("/")[1] || "",
          detail: myInfo?.data?.address.split("/")[2] || "",
        }}
      />
    </>
  );
}
