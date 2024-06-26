import { IAdminMemberType } from '@/types/global';

import UserProfileButton from './UserProfileButton';

export default function UserManagementButton({
  user,
}: {
  user: IAdminMemberType;
}) {
  return (
    <div className="w-full p-3 flex m-auto border border-gray10 bg-white rounded-bs_5 tablet:w-full mobile:w-full">
      <UserProfileButton userName={user.memberName} memberId={user.id} />
      <div className="border-l border-gray10 ml-3 pl-3 ">
        <p>{user.memberEmail}</p>
        <p className="text-gray40">
          #{user.id} | {user.loginType}
        </p>
      </div>
    </div>
  );
}
