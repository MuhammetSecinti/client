import { useAuth } from "../../contexts/AuthContext";

import { Text, Button } from "@chakra-ui/react";

function Profile({ history }) {
  const { user, logout } = useAuth();

  return (
    <div>
      <Text fontSize="22">Profile</Text>
      <code>{JSON.stringify(user)}</code>
    </div>
  );
}

export default Profile;
